# The Fashion Elements

Two periodic tables in one site, with a toggle in the masthead:

- **The Periodic Table of Indian Fashion.** 118 trends the fashion press named in 2025–26.
- **The Periodic Table of Bangalore Garbage.** 118 things found on Bangalore footpaths in 2025–26, with field notes on where and when.

On a first visit the cover asks which table you want. Both use the same magazine layout and museum-style exhibit cards. The edition is remembered in the browser and can be linked directly with `?ed=garbage`.

The fashion edition is laid out as a magazine issue with museum-style exhibit cards. It uses the real 118-element periodic table. Every element keeps its true symbol, number and family, and each symbol stands for a fashion trend with matching initials, named in 2025–26 fashion coverage.

- **Sourced trends.** Each card links to the article that named the trend. Sources include:
  - ELLE India, Harper's Bazaar India, Cosmopolitan India and Man's World India
  - Vogue, Harper's Bazaar, ELLE, Glamour, W, GQ and Marie Claire
  - Who What Wear, Coveteur, Pinterest Predicts and Depop

  The full list is in **Sources**.
- **Look and feel.** Ivory paper, black ink and one rani-pink accent. There is a centred masthead and a quiet colophon. Cards are shown like museum exhibits, with placards.

## Sections

- **Cover.** All 118 elements orbit as a draggable 3D sphere. "See the full table" flies every tile into its place on the periodic table.
- **The Table.** The real periodic table, with:
  - a **timeline** slider and play button that lights up trends in the month the press named them (Jan 2025 → Oct 2026); on the garbage table it runs through one Bangalore year, January to December, by season
  - family filters and a Gen Z filter
  - period and group highlighting
  - arrow-key navigation
- **The Lab.** Mix up to three elements into a compound and get a named look. On the garbage table the compound is a field note: where, when, and what was in the pile.
- **Gen Z.** 20 flip cards translate Gen Z and desi slang into the trends they describe. Also, 45 trends are flagged as Gen Z-led.
- **Families.** Ten halls, each with a one-line note on what its elements have in common.

## Exhibit cards

- **Shop the look.** Hotspots on the illustration light up each piece.
- **Share.** Makes a 1080×1920 story image you can download or share.
- **Copy.** Copies the card as text.

## Extras

- **Opening curtain.** Plays once per visit.
- **Ambient tanpura sound.** Off by default; turn it on from the masthead.
- **Search.** Open it with ⌘K or `/`.

Every illustration is drawn in code as inline SVG, so there are no image files.

## Build

The source lives in `src/`:

| File | What it holds |
|---|---|
| `page.tpl.html` | markup and CSS |
| `kit.js` | the illustration kit (people and backdrops) |
| `junk.js` | the junk kit (bins, bags, cows, cones) |
| `data.js` | the 118 trends and their sources |
| `garbage.js` | the 118 finds, their field notes, and the garbage edition's story, slang and copy |
| `app.js` | the logic |

Rebuild `index.html` with:

```
python3 build.py
```

To view it, open `index.html` in a browser, or enable GitHub Pages: Settings → Pages → deploy from the `main` branch.
