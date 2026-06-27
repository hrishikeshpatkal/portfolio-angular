// Generates optimized WebP variants of source raster images.
// Run with: node scripts/optimize-images.mjs
//
// Source PNGs are kept on disk (and used for social/OG meta where WebP
// support is unreliable); on-page <img> references point at the WebP output.

import { readdir, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const PROJECTS_DIR = 'public/images/projects';

const TASKS = [
  {
    label: 'Project screenshots',
    dir: PROJECTS_DIR,
    match: (name) => name.endsWith('.png'),
    width: 960,
    quality: 78,
  },
  {
    label: 'Profile photo',
    dir: 'public/images',
    match: (name) => name === 'profile-photo.png',
    width: 560,
    quality: 82,
  },
];

const kb = (bytes) => `${Math.round(bytes / 1024)}KB`;

async function optimize({ label, dir, match, width, quality }) {
  const entries = (await readdir(dir)).filter(match);
  let savedTotal = 0;

  for (const name of entries) {
    const src = join(dir, name);
    const out = join(dir, `${parse(name).name}.webp`);

    const before = (await stat(src)).size;
    await sharp(src)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(out);
    const after = (await stat(out)).size;

    savedTotal += before - after;
    console.log(`  ${name} ${kb(before)} -> ${parse(out).base} ${kb(after)}`);
  }

  console.log(`${label}: ${entries.length} file(s), saved ~${kb(savedTotal)}\n`);
}

console.log('Optimizing images...\n');
for (const task of TASKS) {
  await optimize(task);
}
console.log('Done.');
