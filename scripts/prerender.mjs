import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const rootDir = process.cwd();
const ssrEntryPath = path.resolve(rootDir, '.ssr', 'entry-server.js');
const indexPath = path.resolve(rootDir, 'dist', 'index.html');

if (!fs.existsSync(ssrEntryPath)) {
  console.error(`[prerender] Error: SSR bundle not found at ${ssrEntryPath}`);
  process.exit(1);
}

if (!fs.existsSync(indexPath)) {
  console.error(`[prerender] Error: dist/index.html not found at ${indexPath}`);
  process.exit(1);
}

try {
  const { render } = await import(pathToFileURL(ssrEntryPath).href);
  if (typeof render !== 'function') {
    throw new Error('SSR entry module did not export a render function');
  }

  const appHtml = render();
  if (!appHtml || typeof appHtml !== 'string') {
    throw new Error('Render output is empty or not a string');
  }

  const template = fs.readFileSync(indexPath, 'utf-8');
  const target = '<div id="root"></div>';

  if (!template.includes(target)) {
    throw new Error(`Target container '${target}' not found in dist/index.html`);
  }

  const prerenderedHtml = template.replace(target, `<div id="root">${appHtml}</div>`);
  fs.writeFileSync(indexPath, prerenderedHtml, 'utf-8');

  console.log('[prerender] Successfully prerendered homepage into dist/index.html');
} catch (error) {
  console.error('[prerender] Prerendering failed:', error);
  process.exit(1);
}
