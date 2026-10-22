#!/usr/bin/env python3
"""Build index.html from src/: the page template plus the illustration kit, the trend data and the app script.

Usage: python3 build.py [--fragment OUT]
  Writes index.html (a full HTML document). With --fragment, also writes the
  page without the <html>/<head>/<body> wrapper to OUT (used for previews).
"""
import sys
from pathlib import Path

root = Path(__file__).parent
src = root / "src"
page = (src / "page.tpl.html").read_text()
for slot, name in (("/*KIT*/", "kit.js"), ("/*JUNK*/", "junk.js"), ("/*DATA*/", "data.js"), ("/*GARBAGE*/", "garbage.js"), ("/*CHEM*/", "chem.js"), ("/*SEEN*/", "seen.js"), ("/*APP*/", "app.js"), ("/*EXTRAS*/", "extras.js")):
    page = page.replace(slot, (src / name).read_text())

head, rest = page.split("</style>", 1)
doc = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
       '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
       + head + "</style>\n</head>\n<body>" + rest + "</body>\n</html>\n")
(root / "index.html").write_text(doc)

if "--fragment" in sys.argv:
    Path(sys.argv[sys.argv.index("--fragment") + 1]).write_text(page)
print(f"index.html: {len(doc):,} bytes")
