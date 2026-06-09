import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

if (!process.env.PUPPETEER_CACHE_DIR) {
  process.env.PUPPETEER_CACHE_DIR = path.resolve('.puppeteer-cache');
}

const { default: puppeteer } = await import('puppeteer');

const outDir = 'screenshots';

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--allow-file-access-from-files'],
});

const entries = await fs.readdir('./infographics', { withFileTypes: true });
const htmlFiles = entries
  .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.html'))
  .sort();

await fs.mkdir(outDir, { recursive: true });

for (const entry of htmlFiles) {
  const page = await browser.newPage();
  const fileUrl = pathToFileURL(path.join('./infographics', entry.name)).href;
  
  await page.goto(fileUrl);
  await page.setViewport({ width: 800, height: 1000, deviceScaleFactor: 2 });


  const outputPath = path.join(outDir, `${path.basename(entry.name, '.html')}.png`);
  const element = await page.$('.ws-infographic');
  await element.screenshot({ path: outputPath });
  
  await page.close();
  console.log(`Saved ${outputPath}`);
}

await browser.close();