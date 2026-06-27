import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const imagesDir = path.join(root, 'public', 'images');
const projectsDir = path.join(imagesDir, 'projects');
fs.mkdirSync(projectsDir, { recursive: true });

function svgCard(title, subtitle, a = '#00d4ff', b = '#ff00ff') {
  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024" viewBox="0 0 1536 1024">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1536" y2="1024" gradientUnits="userSpaceOnUse">
      <stop stop-color="${a}"/><stop offset="1" stop-color="${b}"/>
    </linearGradient>
    <radialGradient id="bg" cx="50%" cy="40%" r="75%">
      <stop stop-color="#18213f"/><stop offset="1" stop-color="#070912"/>
    </radialGradient>
  </defs>
  <rect width="1536" height="1024" rx="64" fill="url(#bg)"/>
  <rect x="72" y="72" width="1392" height="880" rx="48" fill="none" stroke="url(#g)" stroke-width="8" opacity=".75"/>
  <rect x="148" y="170" width="1240" height="430" rx="40" fill="#0f172a" opacity=".86"/>
  <path d="M220 520c130-180 230 80 350-90s250 170 390-30 250 60 360-80" fill="none" stroke="url(#g)" stroke-width="18" stroke-linecap="round" opacity=".9"/>
  <text x="150" y="730" fill="#f8fafc" font-size="84" font-weight="800" font-family="Arial, sans-serif">${title}</text>
  <text x="154" y="810" fill="#cbd5e1" font-size="42" font-weight="600" font-family="Arial, sans-serif">${subtitle}</text>
</svg>`);
}

function profileSvg() {
  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <defs><linearGradient id="g" x1="160" y1="160" x2="864" y2="864"><stop stop-color="#00d4ff"/><stop offset="1" stop-color="#ff00ff"/></linearGradient></defs>
  <rect width="1024" height="1024" rx="128" fill="#080a14"/>
  <circle cx="512" cy="392" r="170" fill="#17203a" stroke="url(#g)" stroke-width="18"/>
  <path d="M220 900c55-210 184-310 292-310s237 100 292 310" fill="#111827" stroke="url(#g)" stroke-width="18"/>
  <text x="512" y="450" text-anchor="middle" font-family="Arial, sans-serif" font-size="180" font-weight="800" fill="url(#g)">HP</text>
</svg>`);
}

function logoSvg() {
  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs><linearGradient id="g" x1="64" y1="64" x2="448" y2="448"><stop stop-color="#00d4ff"/><stop offset="1" stop-color="#ff00ff"/></linearGradient></defs>
  <rect width="512" height="512" rx="112" fill="#080a14"/>
  <rect x="38" y="38" width="436" height="436" rx="92" fill="none" stroke="url(#g)" stroke-width="16"/>
  <text x="256" y="326" text-anchor="middle" font-family="Arial, sans-serif" font-size="190" font-weight="900" fill="url(#g)">HP</text>
</svg>`);
}

async function writeIfMissing(file, writer) {
  if (fs.existsSync(file)) {
    console.log(`kept ${path.relative(root, file)}`);
    return;
  }

  await writer(file);
  console.log(`created ${path.relative(root, file)}`);
}

await writeIfMissing(path.join(imagesDir, 'hp-logo.jpeg'), (file) =>
  sharp(logoSvg()).jpeg({ quality: 90 }).toFile(file)
);
await writeIfMissing(path.join(imagesDir, 'profile-photo.png'), (file) =>
  sharp(profileSvg()).png().toFile(file)
);
await writeIfMissing(path.join(imagesDir, 'profile-photo.webp'), (file) =>
  sharp(profileSvg()).resize({ width: 560 }).webp({ quality: 82 }).toFile(file)
);

const projects = [
  ['ecommerce-store.webp', 'E-Commerce Store', 'Product catalog and checkout', '#00d4ff', '#ff00ff'],
  ['netflix-clone.webp', 'Netflix Clone', 'Streaming style media UI', '#ff004c', '#8b5cf6'],
  ['realtime-chat.webp', 'Real-Time Chat', 'Live messaging platform', '#00d4ff', '#22c55e'],
  ['spotify-clone.webp', 'Spotify Clone', 'Music streaming experience', '#1db954', '#00d4ff'],
  ['activity-dashboard.webp', 'Activity Dashboard', 'Real-time ops visibility', '#38bdf8', '#a78bfa'],
  ['jibe-qhse-task-manager.webp', 'JiBe QHSE Task Manager', 'Enterprise compliance workflows', '#00d4ff', '#22c55e'],
];

for (const [name, title, subtitle, a, b] of projects) {
  await writeIfMissing(path.join(projectsDir, name), (file) =>
    sharp(svgCard(title, subtitle, a, b)).resize({ width: 960 }).webp({ quality: 78 }).toFile(file)
  );
}
