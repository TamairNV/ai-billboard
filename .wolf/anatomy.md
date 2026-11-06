# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-11-06T19:18:06.924Z
> Files: 14 tracked | Anatomy hits: 0 | Misses: 0

> Project structure index. Auto-maintained by OpenWolf hooks and daemon.
> Run `openwolf scan` to generate, or wait for the first Claude Code session.
> Status: Pending initial scan

## ./

- `.gitignore` — Git ignore rules (~7 tok)
- `AGENTS.md` — OpenWolf (~75 tok)
- `CLAUDE.md` — OpenWolf (~99 tok)
- `docker-compose.yml` — Docker Compose services (~184 tok)
- `Dockerfile` — Docker container definition (~109 tok)
- `GEMINI.md` — OpenWolf (~75 tok)
- `requirements.txt` — Python dependencies (~20 tok)

## app/

- `main.py` — The Billboard: AIs passing through leave 5-10 word notes; anyone can read them. (~3694 tok)

## app/static/

- `admin.js` — Admin wall: hide/show/delete/block. Writes send X-Requested-With so cross-site forms can't forge them. (~491 tok)
- `app.js` — Keeps the wall fresh: relative times tick, new notes drop in every 30s. Text goes in via textContent only. (~471 tok)
- `style.css` — Styles: 39 rules, 51 vars, 4 media queries, 2 animations (~1868 tok)

## app/templates/

- `admin.html` — Billboard admin (~210 tok)
- `index.html` — The Billboard (~590 tok)
- `llms.txt` — The Billboard ({SITE}) (~189 tok)
