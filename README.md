# Källrummet

Personlig statisk webbplats med nyhetsflöden, länksamling, metasök för historia och kulturarv samt Nattarkivet för musik, radio och kultur.

## Testa lokalt

Öppna helst sidan via den enkla lokala servern, inte direkt som `file://`. Då kan webbläsaren läsa `feeds.json`, `search-sources.json`, `style.css` och `app.js` på samma sätt som efter uppladdning.

```powershell
cd "C:\Users\mikae\Documents\bahnhof"
python -m http.server 8000
```

Öppna sedan:

```text
http://127.0.0.1:8000/
```

Om webbläsaren verkar visa en gammal version, gör en hård omladdning med `Ctrl+F5`.

## Filer att ladda upp

Ladda upp hela innehållet i `C:\Users\mikae\Documents\bahnhof`, särskilt:

- `index.html`
- `finska.html`
- `nattarkivet.html`
- `fotboll.html`
- `fotboll-hero.png`
- `kulturarv.html`
- `style.css`
- `finska.js`
- `news-widget.js` (nyhetsflödet på startsidan)
- `app.js` (metasöket på startsidan)
- `nattarkivet.js`
- `nattarkivet-data.js`
- `nattarkivet-tracks.json`
- `fotboll.js`
- `kulturarv.js`
- `feeds.json`
- `podcast-feeds.json` (referenslista för Nattarkivets RSS-flöden)
- `search-sources.json`
- `news.json`
- `news-data.js` (inbyggd reservcache för startsidans nyhetsflöde)
- bilder, ikoner, `site.webmanifest`, `robots.txt` och `sitemap.xml`

## Ändra RSS-flöden

RSS-listan finns i:

```text
feeds.json
```

Efter ändring kan den lokala nyhetscachen uppdateras med:

```powershell
cd "C:\Users\mikae\Documents\bahnhof"
node update-news-cache.js
```

Kommandot hämtar alla källor med `Promise.allSettled()`, slår ihop artiklarna och uppdaterar både `news.json` och `news-data.js`. Nyhetswidgeten läser bara dessa färdiga datafiler och behöver därför inga RSS-proxyer i webbläsaren.

## Ändra metasökets källor

Källorna finns i:

```text
search-sources.json
```

Använd helst `type: "site"` för källor där den egna sökfunktionen är instabil. Då öppnas en Google-sökning med `site:`-filter. Använd `type: "template"` när källan har en stabil sök-URL.

Exempel:

```json
{
  "id": "exempel",
  "label": "Exempelarkivet",
  "searchSite": "example.org",
  "search": { "type": "site", "site": "example.org" }
}
```

## Cache-busting

`index.html` länkar till:

```html
style.css?v=2026-06-19-2
finska.js?v=2026-05-28-1
news-widget.js?v=2026-06-19-3
app.js?v=2026-06-19-4
fotboll.js?v=2026-06-18-2
nattarkivet.js?v=2026-05-23-5
```

`nattarkivet-data.js` laddas dynamiskt av `nattarkivet.js` som reserv om JSON-arkivet inte kan läsas. Höj versionsnumret när en CSS- eller JavaScript-fil ändras och du vill vara säker på att webbläsaren hämtar den nya filen efter uppladdning.

## Nattarkivet

Musikundersidan finns i:

```text
nattarkivet.html
```

Logiken för Deep Cuts, Navigator och RSS-reservläget finns i:

```text
nattarkivet.js
```

Reservfilen som gör att hela arkivet även fungerar när sidan öppnas direkt som HTML finns i:

```text
nattarkivet-data.js
```

Den statiska låtlistan för hela arkivet finns i:

```text
nattarkivet-tracks.json
```
