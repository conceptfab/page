import os
import subprocess
import glob
import shutil
from pathlib import Path
import re
from datetime import datetime
from html.parser import HTMLParser

def run_cmd(cmd):
    try:
        subprocess.run(cmd, shell=True, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Błąd podczas wykonywania: {cmd}")
        print(e)
        return False
    return True

def get_size(path):
    return os.path.getsize(path)

class HtmlToMd(HTMLParser):
    """Extracts <main> content and renders it as Markdown for AI agent consumption."""

    SKIP_TAGS = {
        "script", "style", "svg", "use", "noscript", "img",
        "header", "footer", "nav", "form", "input", "select", "textarea",
        "button", "iframe",
    }
    HEADING_TAGS = {"h1", "h2", "h3", "h4", "h5", "h6"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.in_main = False
        self.main_depth = 0
        self.skip_depth = 0
        self.parts = []
        self.list_stack = []
        self.li_counters = []
        self.in_pre = False
        self.in_code = False
        self.heading_level = 0
        self.link_href = None
        self.link_buffer = None

    def _emit(self, text):
        if self.link_buffer is not None:
            self.link_buffer.append(text)
        else:
            self.parts.append(text)

    def handle_starttag(self, tag, attrs):
        if not self.in_main and tag != "main":
            return
        if tag == "main":
            self.in_main = True
            self.main_depth = 1
            return
        if self.in_main:
            self.main_depth += 1 if tag not in ("br", "hr", "img", "input") else 0

        if self.skip_depth or tag in self.SKIP_TAGS:
            self.skip_depth += 1
            return

        attrs_d = dict(attrs)

        if tag in self.HEADING_TAGS:
            self.heading_level = int(tag[1])
            self._emit("\n\n" + "#" * self.heading_level + " ")
        elif tag == "p":
            self._emit("\n\n")
        elif tag == "ul":
            self.list_stack.append("ul")
        elif tag == "ol":
            self.list_stack.append("ol")
            self.li_counters.append(0)
        elif tag == "li":
            depth = max(0, len(self.list_stack) - 1)
            indent = "  " * depth
            if self.list_stack and self.list_stack[-1] == "ol":
                self.li_counters[-1] += 1
                self._emit(f"\n{indent}{self.li_counters[-1]}. ")
            else:
                self._emit(f"\n{indent}- ")
        elif tag in ("strong", "b"):
            self._emit("**")
        elif tag in ("em", "i"):
            self._emit("*")
        elif tag == "code" and not self.in_pre:
            self.in_code = True
            self._emit("`")
        elif tag == "pre":
            self.in_pre = True
            self._emit("\n\n```\n")
        elif tag == "a":
            self.link_href = attrs_d.get("href", "")
            self.link_buffer = []
        elif tag == "br":
            self._emit("  \n")
        elif tag == "hr":
            self._emit("\n\n---\n\n")
        elif tag in ("section", "article", "div", "aside"):
            self._emit("\n\n")
        elif tag == "blockquote":
            self._emit("\n\n> ")

    def handle_endtag(self, tag):
        if not self.in_main:
            return
        if tag == "main":
            self.in_main = False
            self.main_depth = 0
            return
        if tag not in ("br", "hr", "img", "input"):
            self.main_depth -= 1

        if self.skip_depth:
            self.skip_depth -= 1
            return

        if tag in self.HEADING_TAGS:
            self._emit("\n\n")
            self.heading_level = 0
        elif tag in ("ul", "ol"):
            if self.list_stack and self.list_stack[-1] == tag:
                self.list_stack.pop()
                if tag == "ol" and self.li_counters:
                    self.li_counters.pop()
            self._emit("\n")
        elif tag in ("strong", "b"):
            self._emit("**")
        elif tag in ("em", "i"):
            self._emit("*")
        elif tag == "code" and not self.in_pre:
            self.in_code = False
            self._emit("`")
        elif tag == "pre":
            self.in_pre = False
            self._emit("\n```\n\n")
        elif tag == "a":
            text = "".join(self.link_buffer or []).strip()
            self.link_buffer = None
            href = self.link_href or ""
            self.link_href = None
            if text and href and not href.startswith("#"):
                self.parts.append(f"[{text}]({href})")
            elif text:
                self.parts.append(text)
        elif tag in ("section", "article", "div", "aside", "p", "blockquote"):
            self._emit("\n")

    def handle_data(self, data):
        if not self.in_main or self.skip_depth:
            return
        if self.in_pre:
            self._emit(data)
            return
        text = re.sub(r"\s+", " ", data)
        self._emit(text)

    def render(self):
        text = "".join(self.parts)
        text = re.sub(r"[ \t]+\n", "\n", text)
        text = re.sub(r"\n{3,}", "\n\n", text)
        text = re.sub(r"^[ \t]+", "", text, flags=re.MULTILINE)
        text = re.sub(r"^(#{1,6})\s+", r"\1 ", text, flags=re.MULTILINE)
        text = re.sub(r"^(\s*[-*]|\s*\d+\.)\s+", lambda m: m.group(1) + " ", text, flags=re.MULTILINE)
        text = re.sub(r"[ \t]{2,}", " ", text)
        text = re.sub(r"\n+(- |\d+\. )", r"\n\1", text)
        return text.strip() + "\n"


def html_file_to_md(html_path, md_path, title_meta=None):
    """Convert an HTML page to a Markdown summary for AI agents."""
    with open(html_path, "r", encoding="utf-8") as f:
        html = f.read()

    title_match = re.search(r"<title>([^<]+)</title>", html, re.IGNORECASE)
    desc_match = re.search(
        r'<meta\s+name=["\']description["\']\s+content=["\']([^"\']+)["\']',
        html,
        re.IGNORECASE,
    )
    canonical_match = re.search(
        r'<link\s+rel=["\']canonical["\']\s+href=["\']([^"\']+)["\']',
        html,
        re.IGNORECASE,
    )

    parser = HtmlToMd()
    parser.feed(html)
    body = parser.render()

    header_lines = []
    if title_match:
        header_lines.append(f"# {title_match.group(1).strip()}")
    if desc_match:
        header_lines.append(f"\n> {desc_match.group(1).strip()}")
    if canonical_match:
        header_lines.append(f"\nSource: {canonical_match.group(1).strip()}")

    header = "\n".join(header_lines).strip()
    final = (header + "\n\n" + body) if header else body

    os.makedirs(os.path.dirname(md_path) or ".", exist_ok=True)
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(final)


def generate_markdown_pages():
    """Generate Markdown versions of HTML pages for Markdown for Agents content negotiation."""
    pages = [
        ("pomoc.html", "pomoc.md"),
        ("aktualizacje.html", "aktualizacje.md"),
        ("polityka-prywatnosci.html", "polityka-prywatnosci.md"),
        ("en/help.html", "en/help.md"),
        ("en/updates.html", "en/updates.md"),
        ("en/privacy-policy.html", "en/privacy-policy.md"),
    ]
    for src, dst in pages:
        if os.path.exists(src):
            html_file_to_md(src, dst)
            size = os.path.getsize(dst)
            print(f"  {src} -> {dst} ({size} bytes)")
        else:
            print(f"  ! pominięto {src} (brak pliku)")


def generate_agent_skills_index():
    """Generate /.well-known/agent-skills/index.json per Agent Skills Discovery RFC v0.2.0."""
    import hashlib
    import json

    base = "https://timeflow.conceptfab.com"
    entries = [
        ("TIMEFLOW context (PL)", "context", "Pełen opis produktu TIMEFLOW dla agentów AI — pozycjonowanie, możliwości, sync, prywatność.", "llms-full.txt"),
        ("TIMEFLOW summary (PL)", "context", "Krótki entry point dla agentów: opis i linki do podstron.", "llms.txt"),
        ("TIMEFLOW help (PL)", "documentation", "Centrum pomocy: quick start, dashboard, sesje, projekty, AI, dane, daemon, ustawienia.", "pomoc.md"),
        ("TIMEFLOW changelog (PL)", "documentation", "Pełny changelog 0.1.6 (build 0.1.556) i archiwum 0.1.5.", "aktualizacje.md"),
        ("TIMEFLOW privacy (PL)", "documentation", "Polityka prywatności i przetwarzania formularza.", "polityka-prywatnosci.md"),
        ("TIMEFLOW context (EN)", "context", "Full product context for AI agents — positioning, capabilities, sync, privacy.", "en/llms-full.txt"),
        ("TIMEFLOW summary (EN)", "context", "Short entry point for agents: description and page links.", "en/llms.txt"),
        ("TIMEFLOW help (EN)", "documentation", "Help center: quick start, dashboard, sessions, projects, AI, data, daemon, settings.", "en/help.md"),
        ("TIMEFLOW changelog (EN)", "documentation", "Full changelog 0.1.6 (build 0.1.556) and 0.1.5 archive.", "en/updates.md"),
        ("TIMEFLOW privacy (EN)", "documentation", "Privacy policy and form processing.", "en/privacy-policy.md"),
    ]

    skills = []
    for name, kind, desc, rel_path in entries:
        if not os.path.exists(rel_path):
            print(f"  ! pominięto {rel_path} (brak pliku)")
            continue
        with open(rel_path, "rb") as f:
            digest = hashlib.sha256(f.read()).hexdigest()
        skills.append({
            "name": name,
            "type": kind,
            "description": desc,
            "url": f"{base}/{rel_path}",
            "sha256": digest,
        })

    index = {
        "$schema": "https://agentskills.io/schema/v0.2.0/index.json",
        "skills": skills,
    }

    out_path = ".well-known/agent-skills/index.json"
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(index, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(f"  zapisano {out_path} ({len(skills)} skills)")


def main():
    print("=== TIMEFLOW build (Python) ===")
    
    success = True

    # --- CSS ---
    print("\n[CSS] Minifikacja plików CSS")
    css_files = [
        ("style.css", "style.min.css"),
        ("updates.css", "updates.min.css")
    ]
    
    for src, out in css_files:
        if os.path.exists(src):
            size_before = get_size(src)
            if run_cmd(f"npx --yes lightningcss-cli --minify {src} -o {out}"):
                size_after = get_size(out)
                print(f"  {src} -> {out}: {size_before} -> {size_after} bytes")
            else:
                success = False
    
    # --- JS ---
    js_files = [
        ("script.js", "script.min.js"),
        ("consent.js", "consent.min.js")
    ]
    
    print("\n[JS] Minifikacja plików JavaScript...")
    for src, out in js_files:
        if os.path.exists(src):
            size_before = get_size(src)
            if run_cmd(f"npx --yes terser {src} -o {out} --compress --mangle"):
                size_after = get_size(out)
                print(f"  {src} -> {out}: {size_before} -> {size_after} bytes")
            else:
                success = False

    # --- Markdown for Agents ---
    print("\n[MD] Generowanie wersji Markdown podstron dla agentow AI...")
    generate_markdown_pages()

    # --- Agent Skills Discovery (RFC v0.2.0) ---
    print("\n[AI] Generowanie /.well-known/agent-skills/index.json...")
    generate_agent_skills_index()

    # --- Sitemap ---
    print("\n[SEO] Aktualizacja sitemap.xml...")
    if os.path.exists("sitemap.xml"):
        loc_to_file = {
            "https://timeflow.conceptfab.com/": "index.html",
            "https://timeflow.conceptfab.com/en/": "en/index.html",
            "https://timeflow.conceptfab.com/aktualizacje.html": "aktualizacje.html",
            "https://timeflow.conceptfab.com/en/updates.html": "en/updates.html",
            "https://timeflow.conceptfab.com/pomoc.html": "pomoc.html",
            "https://timeflow.conceptfab.com/en/help.html": "en/help.html"
        }

        with open("sitemap.xml", "r", encoding="utf-8") as f:
            content = f.read()

        def replace_lastmod(match):
            block = match.group(0)
            for loc, filepath in loc_to_file.items():
                if f"<loc>{loc}</loc>" in block and os.path.exists(filepath):
                    mtime = os.path.getmtime(filepath)
                    date_str = datetime.fromtimestamp(mtime).strftime('%Y-%m-%d')
                    block = re.sub(r'<lastmod>.*?</lastmod>', f'<lastmod>{date_str}</lastmod>', block)
                    break
            return block

        new_content = re.sub(r'<url>.*?</url>', replace_lastmod, content, flags=re.DOTALL)
        
        with open("sitemap.xml", "w", encoding="utf-8") as f:
            f.write(new_content)
        print("  Zaktualizowano daty w sitemap.xml")

    # --- Obrazy ---
    print("\n[IMG] Konwersja PNG do WebP...")
    png_files = glob.glob("screens/*.png")
    for png_img in png_files:
        png_img = png_img.replace("\\", "/")
        path = Path(png_img)
        base_name = path.stem
        out_webp = str(path.with_suffix(".webp")).replace("\\", "/")
        
        print(f"  Konwersja {base_name}.png -> {base_name}.webp...")
        if run_cmd(f'npx --yes sharp-cli -i "{png_img}" -o "{out_webp}" -q 80 -f webp'):
            os.remove(png_img)
            print(f"  Usunięto {base_name}.png")
        else:
            success = False

    print("\n[IMG] Generowanie wariantów responsywnych (screens/*.webp)...")
    all_webp = glob.glob("screens/*.webp")
    source_images = [img for img in all_webp if "_480" not in img and "_960" not in img]
    
    for img in source_images:
        img = img.replace("\\", "/")
        path = Path(img)
        base_name = path.stem
        
        out480 = str(path.with_name(f"{base_name}_480.webp")).replace("\\", "/")
        out960 = str(path.with_name(f"{base_name}_960.webp")).replace("\\", "/")
        
        print(f"  Przetwarzanie {base_name}...")
        # 480w
        if not run_cmd(f'npx --yes sharp-cli -i "{img}" -o "{out480}" -q 80 -f webp -- resize 480 --withoutEnlargement'):
            success = False
        # 960w
        if not run_cmd(f'npx --yes sharp-cli -i "{img}" -o "{out960}" -q 80 -f webp -- resize 960 --withoutEnlargement'):
            success = False

    # --- AVIF ---
    print("\n[IMG] Generowanie wariantów AVIF (screens/*.webp -> *.avif)...")
    all_webp_for_avif = glob.glob("screens/*.webp")
    for img in all_webp_for_avif:
        img = img.replace("\\", "/")
        path = Path(img)
        out_avif = str(path.with_suffix(".avif")).replace("\\", "/")
        print(f"  {path.name} -> {Path(out_avif).name}")
        if not run_cmd(f'npx --yes sharp-cli -i "{img}" -o "{out_avif}" -q 45 -f avif'):
            success = False

    if success:
        print("\n=== Build zakończony sukcesem ===")
    else:
        print("\n!!! Build zakończony z błędami !!!")
        exit(1)

if __name__ == "__main__":
    main()
