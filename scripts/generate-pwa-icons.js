// Script to generate PWA icons from SVG
// Run with: node scripts/generate-pwa-icons.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SVG_PATH = path.join(__dirname, '../public/icon.svg');
const OUTPUT_DIR = path.join(__dirname, '../public');

const SIZES = [192, 512];

async function generateIcons() {
  console.log('Generating PWA icons...');

  const svgBuffer = fs.readFileSync(SVG_PATH);

  for (const size of SIZES) {
    const outputPath = path.join(OUTPUT_DIR, `icon-${size}.png`);

    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outputPath);

    console.log(`Created: icon-${size}.png`);
  }

  console.log('Done!');
}

generateIcons().catch(console.error);
