// Convierte una foto generada (PNG 1536×1024 en Descargas) en las dos versiones de la web:
// public/img/photos/<nombre>.jpg (1536×1024) y <nombre>-43.jpg (960×720, recorte 4:3). Guarda el PNG original en src/assets/photos/.
// Uso: node scripts/foto.mjs "<ruta del png>" <nombre>
import sharp from "sharp";
import { copyFileSync, mkdirSync } from "node:fs";
const [src, name] = process.argv.slice(2);
if (!src || !name) { console.error("uso: node scripts/foto.mjs <png> <nombre>"); process.exit(1); }
mkdirSync("src/assets/photos", { recursive: true });
copyFileSync(src, `src/assets/photos/${name}.png`);
const meta = await sharp(src).metadata();
await sharp(src).resize(1536, 1024, { fit: "cover" }).jpeg({ quality: 82, mozjpeg: true }).toFile(`public/img/photos/${name}.jpg`);
await sharp(src).resize(960, 720, { fit: "cover", position: "centre" }).jpeg({ quality: 82, mozjpeg: true }).toFile(`public/img/photos/${name}-43.jpg`);
console.log(`${name}: ${meta.width}×${meta.height} → ${name}.jpg, ${name}-43.jpg`);
