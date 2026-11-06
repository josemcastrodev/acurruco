# Acurruco

Guías, comparativas y catálogo para el primer año del bebé. Sitio estático hecho con Astro y publicado en Cloudflare Pages en https://acurruco.com.

## Desarrollo

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

## Datos

- `src/data/catalog/*.json`: catálogo de Carrefour (feeds de Awin), generado por `scripts/build-catalog.py <carpeta con feed_*.csv>`. El script limpia el feed por reglas de nombre y marca, descarga las imágenes que Carrefour no deja enlazar a `public/img/catalog/` y escribe las versiones ligeras de `public/data/catalogo/` para los filtros.
- `src/data/regalos.json`: selección de regalos por edad, generada por `scripts/build-regalos.py`.
- `src/data/amazon.json`: ASIN de los productos de Amazon. Los precios van a `null` hasta que la Creators API esté aprobada: el acuerdo de Afiliados sólo permite mostrar precios obtenidos por su API.
- `src/data/guias.ts`, `comparativas.ts`, `regalos-guia.ts`: textos de guías, comparativas y guías de regalo.

## Actualización automática

`.github/workflows/catalogo.yml` baja los feeds cada madrugada, reconstruye el catálogo y sube los cambios; ese push dispara el despliegue. Necesita el secreto `AWIN_API_KEY` del repositorio (la clave de la URL de feeds de Awin).

## Comprobaciones

`python scripts/seo-audit.py` revisa títulos, descripciones, canónicas, encabezados y datos estructurados de `dist/`.
