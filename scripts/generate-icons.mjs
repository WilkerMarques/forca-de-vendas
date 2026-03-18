import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdir } from 'node:fs/promises';
import { HorizontalAlign, Jimp, VerticalAlign } from 'jimp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');

const srcPath = path.join(publicDir, 'logo.png');

async function generate(size, padRatio, outName) {
  const pad = Math.round(size * padRatio);
  const inner = size - pad * 2;

  const src = await Jimp.read(srcPath);
  src.contain({
    w: inner,
    h: inner,
    align: HorizontalAlign.CENTER | VerticalAlign.MIDDLE,
  });

  const out = new Jimp({ width: size, height: size, color: 0x00000000 });
  out.composite(src, pad, pad);

  const outPath = path.join(publicDir, outName);
  await out.write(outPath);
  return outPath;
}

await mkdir(publicDir, { recursive: true });

// Padding para PWA (evita ficar "full" ao instalar)
await generate(192, 0.18, 'icon-192.png');
await generate(512, 0.18, 'icon-512.png');

console.log('Generated:', 'public/icon-192.png', 'public/icon-512.png');

