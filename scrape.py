#!/usr/bin/env python3
"""
Scraper for jessewspencer.com (Framer site).
Downloads all images and extracts text content into organized markdown files.

Framer renders most page content client-side via JS modules. This scraper:
1. Fetches HTML for each page
2. Finds page-specific JS chunks (modulepreload links)
3. Extracts image URLs from both HTML and JS chunks
4. Uses Framer's search index JSON for text content fallback
5. Downloads all images at highest resolution
"""

import os
import re
import time
import hashlib
import json
from urllib.parse import urlparse
import requests
from bs4 import BeautifulSoup, Comment

BASE_URL = "https://www.jessewspencer.com"
FRAMER_SITE_BASE = "https://framerusercontent.com/sites/5WbGuhMxoHmoIAiygluATu/"
SEARCH_INDEX_URL = FRAMER_SITE_BASE + "searchIndex-GbkxYD0bPuWt.json"
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "site-scrape")
DELAY = 0.5
MIN_IMAGE_SIZE = 5000  # Skip images smaller than 5KB (responsive thumbnails)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
}

PAGE_IMAGE_DIRS = {
    "/": "home",
    "/design": "design/index",
    "/cache-wallet": "design/cache-wallet",
    "/canvas": "design/canvas",
    "/ebw": "design/ebw",
    "/workday-phoenix": "design/workday-phoenix",
    "/ui-collection": "design/ui-collection",
    "/album-artwork": "design/album-artwork",
    "/logo-collection": "design/logo-collection",
    "/archive": "archive",
    "/music": "music",
    "/photos": "photos",
}

PAGE_CONTENT_FILES = {
    "/": "home.md",
    "/design": "design-index.md",
    "/cache-wallet": "cache-wallet.md",
    "/canvas": "canvas.md",
    "/ebw": "ebw.md",
    "/workday-phoenix": "workday-phoenix.md",
    "/ui-collection": "ui-collection.md",
    "/album-artwork": "album-artwork.md",
    "/logo-collection": "logo-collection.md",
    "/archive": "archive.md",
    "/music": "music.md",
    "/photos": "photos.md",
}

TARGET_PAGES = [
    "/", "/design", "/cache-wallet", "/canvas", "/ebw",
    "/workday-phoenix", "/ui-collection", "/album-artwork",
    "/logo-collection", "/archive", "/music", "/photos",
]

NAV_TEXTS = {"About", "Design", "Music", "Photos", "Jesse W Spencer", "Jesse Spencer"}

# Common/shared navigation image that appears on many pages (the next-project link image)
# We'll track these to note shared usage
SHARED_NAV_IMAGE_URLS = set()

downloaded_images = {}  # url_hash -> local_path
inventory = {}
search_index = {}

session = requests.Session()
session.headers.update(HEADERS)


def ensure_dir(path):
    os.makedirs(path, exist_ok=True)


def clean_image_url(url):
    """Remove scale-down parameters to get highest resolution."""
    parsed = urlparse(url)
    if parsed.query:
        params = parsed.query.split("&")
        filtered = [p for p in params if not p.startswith("scale-down-to=")]
        clean_query = "&".join(filtered)
        url = f"{parsed.scheme}://{parsed.netloc}{parsed.path}"
        if clean_query:
            url += f"?{clean_query}"
    return url


def get_extension(url, response=None):
    """Determine file extension from URL or content type."""
    path = urlparse(url).path
    if "." in os.path.basename(path):
        ext = os.path.splitext(path)[1].lower()
        if ext in (".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif", ".avif"):
            return ext
    if response and "Content-Type" in response.headers:
        ct = response.headers["Content-Type"].lower()
        for check, ext in [("jpeg", ".jpg"), ("jpg", ".jpg"), ("png", ".png"),
                           ("webp", ".webp"), ("svg", ".svg"), ("gif", ".gif"), ("avif", ".avif")]:
            if check in ct:
                return ext
    return ".jpg"


def slugify(text):
    if not text:
        return ""
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_]+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text[:80].rstrip('-')


def download_image(img_url, folder, alt_text="", index=0, skip_small=False):
    """Download an image. Returns (local_relative_path, was_already_cached) or (None, False)."""
    img_url = clean_image_url(img_url)
    url_hash = hashlib.md5(img_url.encode()).hexdigest()

    if url_hash in downloaded_images:
        return downloaded_images[url_hash], True

    try:
        resp = session.get(img_url, timeout=30)
        resp.raise_for_status()
    except Exception as e:
        print(f"  [WARN] Failed to download {img_url}: {e}")
        return None, False

    # Skip tiny responsive thumbnails
    if skip_small and len(resp.content) < MIN_IMAGE_SIZE:
        return None, False

    ext = get_extension(img_url, resp)

    if alt_text and slugify(alt_text):
        filename = slugify(alt_text) + ext
    else:
        filename = f"{index:02d}{ext}"

    img_dir = os.path.join(OUTPUT_DIR, "images", folder)
    ensure_dir(img_dir)
    filepath = os.path.join(img_dir, filename)
    counter = 1
    while os.path.exists(filepath):
        name = slugify(alt_text) if alt_text and slugify(alt_text) else f"{index:02d}"
        filename = f"{name}-{counter}{ext}"
        filepath = os.path.join(img_dir, filename)
        counter += 1

    with open(filepath, "wb") as f:
        f.write(resp.content)

    rel_path = os.path.join("images", folder, filename)
    downloaded_images[url_hash] = rel_path
    print(f"  Downloaded: {folder}/{filename} ({len(resp.content)//1024}KB)")
    return rel_path, False


def get_best_srcset_url(srcset):
    """Parse srcset and return the highest resolution framerusercontent URL."""
    if not srcset:
        return None
    candidates = []
    for part in srcset.split(","):
        part = part.strip()
        pieces = part.split()
        if not pieces:
            continue
        url = pieces[0]
        width = 0
        if len(pieces) > 1:
            w_match = re.search(r'(\d+)w', pieces[1])
            x_match = re.search(r'(\d+)x', pieces[1])
            if w_match:
                width = int(w_match.group(1))
            elif x_match:
                width = int(x_match.group(1)) * 1000
        candidates.append((url, width))

    if not candidates:
        return None
    candidates.sort(key=lambda x: x[1], reverse=True)
    url = candidates[0][0]
    return url if "framerusercontent.com" in url else None


def extract_images_from_html(soup):
    """Extract image URLs from parsed HTML."""
    images = []

    for img in soup.find_all("img"):
        src = img.get("src", "")
        srcset = img.get("srcset", "")
        alt = img.get("alt", "")

        if srcset:
            best_url = get_best_srcset_url(srcset)
            if best_url:
                images.append((best_url, alt))
                continue
        if src and "framerusercontent.com" in src:
            images.append((src, alt))

    for source in soup.find_all("source"):
        srcset = source.get("srcset", "")
        if srcset and "framerusercontent.com" in srcset:
            best_url = get_best_srcset_url(srcset)
            if best_url:
                images.append((best_url, ""))

    for elem in soup.find_all(style=True):
        bg_urls = re.findall(
            r'url\(["\']?(https://framerusercontent\.com[^"\')\s]+)["\']?\)',
            elem.get("style", ""))
        for url in bg_urls:
            images.append((url, ""))

    for style_tag in soup.find_all("style"):
        if style_tag.string:
            bg_urls = re.findall(
                r'url\(["\']?(https://framerusercontent\.com[^"\')\s]+)["\']?\)',
                style_tag.string)
            for url in bg_urls:
                images.append((url, ""))

    return dedupe_images(images)


def extract_images_from_js_chunks(soup):
    """Find page-specific JS chunks and extract framerusercontent image URLs."""
    chunk_urls = set()
    for link in soup.find_all("link", rel="modulepreload"):
        href = link.get("href", "")
        if href and "/sites/" in href:
            chunk_urls.add(href)

    # Also get shared chunks that all pages load
    # We only want page-specific chunks, but we'll scan all to be safe
    images = []
    for chunk_url in chunk_urls:
        try:
            resp = session.get(chunk_url, timeout=15)
            urls = re.findall(
                r'https://framerusercontent\.com/images/[A-Za-z0-9_-]+(?:\.[a-z]+)?',
                resp.text)
            for url in urls:
                images.append((url, ""))
        except Exception:
            pass

    return dedupe_images(images)


def dedupe_images(images):
    """Deduplicate images by cleaned URL, preserving order and preferring entries with alt text."""
    seen = {}
    for url, alt in images:
        clean = clean_image_url(url)
        if clean not in seen:
            seen[clean] = alt
        elif alt and not seen[clean]:
            seen[clean] = alt
    return [(url, alt) for url, alt in seen.items()]


def extract_text_from_html(soup):
    """Extract meaningful text content from page HTML."""
    # Work on a copy
    soup_copy = BeautifulSoup(str(soup), "html.parser")

    for tag in soup_copy.find_all(["script", "style", "noscript", "iframe"]):
        tag.decompose()
    for comment in soup_copy.find_all(string=lambda text: isinstance(text, Comment)):
        comment.extract()

    main = soup_copy.find("main") or soup_copy.find("div", {"id": "main"}) or soup_copy

    parts = []
    seen = set()

    def process(elem):
        if not hasattr(elem, "name") or not elem.name:
            return
        if elem.name in ("nav", "footer", "header", "script", "style"):
            return

        if elem.name in ("h1", "h2", "h3", "h4", "h5", "h6"):
            text = elem.get_text(strip=True)
            if text and text not in NAV_TEXTS and text not in seen:
                level = int(elem.name[1])
                parts.append(f"\n{'#' * level} {text}\n")
                seen.add(text)
            return

        if elem.name == "p":
            text = elem.get_text(strip=True)
            if text and len(text) > 2 and text not in NAV_TEXTS and text not in seen:
                links = elem.find_all("a")
                if links:
                    md = convert_inline_md(elem)
                    if md.strip():
                        parts.append(f"\n{md}\n")
                else:
                    parts.append(f"\n{text}\n")
                seen.add(text)
            return

        if elem.name in ("ul", "ol"):
            for li in elem.find_all("li", recursive=False):
                text = li.get_text(strip=True)
                if text and text not in seen:
                    parts.append(f"{'- ' if elem.name == 'ul' else '1. '}{text}")
                    seen.add(text)
            parts.append("")
            return

        if elem.name == "a" and elem.parent and elem.parent.name not in ("p", "li", "h1", "h2", "h3"):
            text = elem.get_text(strip=True)
            href = elem.get("href", "")
            if text and text not in NAV_TEXTS and text not in seen and len(text) > 2:
                if href and not href.startswith("#"):
                    parts.append(f"\n[{text}]({href})\n")
                else:
                    parts.append(f"\n{text}\n")
                seen.add(text)
            return

        if elem.name in ("div", "span", "section"):
            direct_text = "".join(
                child.strip() for child in elem.children if isinstance(child, str)
            )
            if direct_text and len(direct_text) > 2 and direct_text not in NAV_TEXTS and direct_text not in seen:
                parts.append(f"\n{direct_text}\n")
                seen.add(direct_text)

            for child in elem.children:
                if hasattr(child, "name") and child.name:
                    process(child)

    process(main)
    return "\n".join(parts).strip()


def convert_inline_md(elem):
    """Convert inline HTML to markdown."""
    parts = []
    for child in elem.children:
        if isinstance(child, str):
            parts.append(child)
        elif child.name == "a":
            text = child.get_text(strip=True)
            href = child.get("href", "")
            parts.append(f"[{text}]({href})" if href and text else text or "")
        elif child.name in ("strong", "b"):
            parts.append(f"**{child.get_text(strip=True)}**")
        elif child.name in ("em", "i"):
            parts.append(f"*{child.get_text(strip=True)}*")
        else:
            parts.append(child.get_text(strip=True))
    return " ".join(parts)


def build_text_from_search_index(page_path):
    """Build markdown text from Framer's search index data."""
    data = search_index.get(page_path)
    if not data:
        return ""

    parts = []
    for h in data.get("h1", []):
        if h and h not in NAV_TEXTS:
            parts.append(f"\n## {h}\n")
    for h in data.get("h2", []):
        if h and h not in NAV_TEXTS:
            parts.append(f"\n### {h}\n")
    for h in data.get("h3", []):
        if h and h not in NAV_TEXTS:
            parts.append(f"\n#### {h}\n")
    for p in data.get("p", []):
        if p and len(p) > 2 and p not in NAV_TEXTS:
            parts.append(f"\n{p}\n")

    return "\n".join(parts).strip()


def detect_photo_category(alt_text):
    """Categorize a photo into a gallery subfolder."""
    text = alt_text.lower()
    astro = ["milky way", "stars", "galaxy", "nebula", "astrophoto", "night sky", "aurora"]
    timelapse = ["timelapse", "time-lapse", "time lapse", "long exposure", "star trail"]
    people = ["portrait", "person", "people", "face", "headshot", "band", "musician", "columbine"]
    parks = ["national park", "yosemite", "zion", "arches", "glacier", "grand teton",
             "rocky mountain", "antelope canyon", "mount evans", "cracker lake",
             "taft point", "canyon", "jenny lake"]

    for kw in astro:
        if kw in text: return "astrophotography"
    for kw in timelapse:
        if kw in text: return "timelapse"
    for kw in people:
        if kw in text: return "people"
    for kw in parks:
        if kw in text: return "national-parks"
    return "national-parks"  # default for landscape/nature


def fetch_search_index():
    """Fetch Framer's search index containing text content for all pages."""
    global search_index
    try:
        resp = session.get(SEARCH_INDEX_URL, timeout=15)
        resp.raise_for_status()
        search_index = json.loads(resp.text)
        print(f"Loaded search index with {len(search_index)} pages")
    except Exception as e:
        print(f"[WARN] Could not load search index: {e}")


def scrape_page(page_path):
    """Scrape a single page."""
    url = BASE_URL + (page_path if page_path != "/" else "/")
    print(f"\n{'='*60}")
    print(f"Scraping: {url}")
    print(f"{'='*60}")

    try:
        resp = session.get(url, timeout=30)
        resp.raise_for_status()
    except Exception as e:
        print(f"  [ERROR] Failed to fetch: {e}")
        inventory[page_path] = {
            "url": url, "title": page_path, "images": [],
            "image_paths": [], "summary": "[FAILED TO FETCH]", "incomplete": True,
        }
        return set()

    soup = BeautifulSoup(resp.text, "html.parser")
    title_tag = soup.find("title")
    title = title_tag.get_text(strip=True) if title_tag else page_path

    # --- Extract images from HTML ---
    html_images = extract_images_from_html(soup)
    print(f"  HTML images: {len(html_images)}")

    # --- Extract images from JS chunks ---
    js_images = extract_images_from_js_chunks(soup)
    print(f"  JS chunk images: {len(js_images)}")

    # Merge: prefer HTML images (they have alt text), add JS-only images
    all_image_urls = {}
    for url_clean, alt in html_images:
        all_image_urls[clean_image_url(url_clean)] = alt
    for url_clean, alt in js_images:
        key = clean_image_url(url_clean)
        if key not in all_image_urls:
            all_image_urls[key] = alt

    # Filter out favicon/icon images
    filtered = {u: a for u, a in all_image_urls.items()
                if "/images/" in u and "favicon" not in u and "touch-icon" not in u}
    print(f"  Total unique content images: {len(filtered)}")

    # --- Download images ---
    img_folder = PAGE_IMAGE_DIRS.get(page_path, page_path.strip("/"))
    downloaded = []

    # For homepage, skip tiny responsive variants
    skip_small = page_path == "/"

    for idx, (img_url, alt) in enumerate(filtered.items()):
        if page_path == "/photos":
            category = detect_photo_category(alt)
            folder = f"photos/{category}"
        else:
            folder = img_folder

        rel_path, was_cached = download_image(img_url, folder, alt, idx, skip_small=skip_small)
        if rel_path:
            downloaded.append((rel_path, alt))

    # --- Extract text content ---
    html_text = extract_text_from_html(soup)
    index_text = build_text_from_search_index(page_path)

    # Use whichever has more content, preferring HTML since it's more structured
    if len(html_text) > len(index_text):
        text_content = html_text
        text_source = "HTML"
    elif index_text:
        text_content = index_text
        text_source = "search index"
    else:
        text_content = ""
        text_source = "none"

    print(f"  Text content: {len(text_content)} chars (from {text_source})")

    # --- Write content markdown ---
    content_file = PAGE_CONTENT_FILES.get(page_path, page_path.strip("/").replace("/", "-") + ".md")
    content_path = os.path.join(OUTPUT_DIR, "content", content_file)
    ensure_dir(os.path.dirname(content_path))

    md = f"# {title}\n\n**URL:** {url}\n\n"
    if text_content:
        md += text_content + "\n\n"
    else:
        md += "*[No text content extracted - page is fully client-side rendered]*\n\n"

    if downloaded:
        md += "---\n\n## Images\n\n"
        for rel_path, alt in downloaded:
            alt_display = alt if alt else os.path.basename(rel_path)
            md += f"![{alt_display}](../{rel_path})\n\n"

    with open(content_path, "w") as f:
        f.write(md)
    print(f"  Saved: content/{content_file}")

    incomplete = not text_content and not downloaded
    inventory[page_path] = {
        "url": url,
        "title": title,
        "images": [os.path.basename(p) for p, _ in downloaded],
        "image_paths": [p for p, _ in downloaded],
        "summary": text_content[:200] + "..." if len(text_content) > 200 else text_content,
        "incomplete": incomplete,
    }

    # Find new internal links
    new_links = find_internal_links(soup)
    return new_links


def find_internal_links(soup):
    """Find all internal links on a page not in TARGET_PAGES."""
    links = set()
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if href.startswith("./"):
            href = "/" + href[2:]
        if href.startswith("#"):
            continue
        parsed = urlparse(href)
        if parsed.scheme and parsed.netloc and "jessewspencer.com" not in parsed.netloc:
            continue
        if not parsed.scheme and not parsed.netloc:
            path = parsed.path
            if not path.startswith("/"):
                path = "/" + path
        elif "jessewspencer.com" in (parsed.netloc or ""):
            path = parsed.path
        else:
            continue
        path = path.rstrip("/") or "/"
        if path not in TARGET_PAGES:
            links.add(path)
    return links


def generate_inventory():
    """Generate the content-inventory.md file."""
    inv_path = os.path.join(OUTPUT_DIR, "content-inventory.md")

    case_studies = ["/cache-wallet", "/canvas", "/ebw", "/workday-phoenix",
                    "/ui-collection", "/album-artwork", "/logo-collection"]

    unique_images = set()
    for data in inventory.values():
        for img in data.get("image_paths", []):
            unique_images.add(img)

    md = "# Content Inventory\n\n"
    md += f"**Generated:** {time.strftime('%Y-%m-%d %H:%M')}\n\n"

    md += "## Summary\n\n"
    md += f"- **Total pages crawled:** {len(inventory)}\n"
    md += f"- **Total unique images downloaded:** {len(unique_images)}\n"
    md += f"- **Total case studies:** {sum(1 for cs in case_studies if cs in inventory)}\n\n"

    # Incomplete pages
    incomplete = [p for p, d in inventory.items() if d.get("incomplete")]
    if incomplete:
        md += "### Flagged for Manual Review\n\n"
        md += "These pages returned minimal content (likely client-side rendered):\n\n"
        for p in incomplete:
            md += f"- {inventory[p]['url']}\n"
        md += "\n"

    # Shared images
    url_to_pages = {}
    for path, data in inventory.items():
        for img_path in data.get("image_paths", []):
            for uhash, lpath in downloaded_images.items():
                if lpath == img_path:
                    url_to_pages.setdefault(uhash, {"path": img_path, "pages": []})
                    url_to_pages[uhash]["pages"].append(path)
                    break

    shared = {h: d for h, d in url_to_pages.items() if len(d["pages"]) > 1}
    if shared:
        md += "### Shared Images\n\n"
        md += "These images appear on multiple pages:\n\n"
        for d in shared.values():
            md += f"- `{d['path']}` used on: {', '.join(d['pages'])}\n"
        md += "\n"

    # Per-page details
    md += "---\n\n## Pages\n\n"
    all_pages = TARGET_PAGES + [p for p in inventory if p not in TARGET_PAGES]

    for page_path in all_pages:
        if page_path not in inventory:
            continue
        data = inventory[page_path]
        md += f"### {data['title']}\n\n"
        md += f"- **URL:** {data['url']}\n"
        md += f"- **Images:** {len(data['images'])}\n"

        if data["images"]:
            md += "- **Image files:**\n"
            for img in data["images"]:
                md += f"  - `{img}`\n"

        if data["summary"]:
            summary = data["summary"].replace("\n", " ")[:300]
            md += f"- **Content summary:** {summary}\n"

        if data.get("incomplete"):
            md += "- **Status:** INCOMPLETE - flagged for manual review\n"
        md += "\n"

    with open(inv_path, "w") as f:
        f.write(md)
    print(f"\nContent inventory saved: {inv_path}")


def main():
    print("=" * 60)
    print("jessewspencer.com Site Scraper")
    print("=" * 60)

    ensure_dir(os.path.join(OUTPUT_DIR, "images"))
    ensure_dir(os.path.join(OUTPUT_DIR, "content"))

    # Load search index for text content
    fetch_search_index()

    pages_to_crawl = list(TARGET_PAGES)
    crawled = set()

    while pages_to_crawl:
        page_path = pages_to_crawl.pop(0)
        if page_path in crawled:
            continue

        new_links = scrape_page(page_path)
        crawled.add(page_path)

        for link in new_links:
            if link not in crawled and link not in pages_to_crawl:
                print(f"  [DISCOVERED] New page: {link}")
                pages_to_crawl.append(link)
                if link not in PAGE_IMAGE_DIRS:
                    PAGE_IMAGE_DIRS[link] = link.strip("/").replace("/", "-")
                if link not in PAGE_CONTENT_FILES:
                    PAGE_CONTENT_FILES[link] = link.strip("/").replace("/", "-") + ".md"

        time.sleep(DELAY)

    generate_inventory()

    print(f"\n{'='*60}")
    print("SCRAPE COMPLETE")
    print(f"{'='*60}")
    print(f"Pages crawled: {len(crawled)}")
    print(f"Unique images downloaded: {len(downloaded_images)}")
    print(f"Output directory: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
