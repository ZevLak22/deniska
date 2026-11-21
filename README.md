# Deniska 🐷🍩 – španělština pro ségru

Webová appka ve stylu Duolinga: 116 lekcí v 10 tématech, od úplných základů po minulý čas (zhruba úroveň A2).
Za každou lekci kobliha pro Denisku, za zkoušku tématu zlatá kobliha a nový doplněk.

## Spuštění
Statický web bez buildu. Stačí nahrát na GitHub Pages (Settings → Pages → Deploy from branch → main / root).

## Struktura
- `index.html` – vstup
- `css/app.css` – vzhled
- `js/app.js` – logika (lekce, cvičení, ukládání, odemykání)
- `js/deniska.js` – prasátko Deniska (SVG, růst, doplňky)
- `data/*.js` – obsah lekcí (slovíčka, věty, tipy). Nová lekce = nový objekt v poli `lessons`.
- `sw.js` – offline cache. Po každé změně zvyš `CACHE` verzi.

Postup se ukládá v telefonu (localStorage). Záloha: Nastavení → Záloha postupu.
