# Public Assets

Denna mapp innehåller alla statiska filer som ska vara tillgängliga på webbplatsen.

## Struktur

- `images/` - Bilder som logotyper, hero-bilder, etc.
- `icons/` - Ikoner för webbplatsen

## Användning

För att använda bilder i din kod:

```jsx
// För bilder
<img src="/images/arete-logo.png" alt="Arete Logo" />

// För ikoner
<img src="/icons/menu-icon.svg" alt="Menu" />
```

## Optimering

För att optimera PNG-bilder, kör:

```bash
npm run optimize-images
```

Detta kommer att komprimera alla PNG-filer i `images/`-mappen.
