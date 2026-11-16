import { readFile, readdir, access } from 'node:fs/promises';
import { resolve, dirname, relative } from 'node:path';
import { root, readNotes } from './content.mjs';
const notes = await readNotes();
const out = resolve(root,'docs');
const pages = ['index.html','rules.html',...(await readdir(resolve(out,'notes'))).filter(x=>x.endsWith('.html')).map(x=>`notes/${x}`)];
let links = 0;
for (const page of pages) {
  const path = resolve(out,page);
  const html = await readFile(path,'utf8');
  if ((html.match(/<h1[ >]/g)||[]).length !== 1) throw new Error(`${page}: h1 數量錯誤`);
  for (const [,url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|data:)/.test(url)) continue;
    const [file,anchor] = url.split('#');
    const target = file ? resolve(dirname(path),file) : path;
    if (relative(out,target).startsWith('..')) throw new Error(`連結超出 docs: ${page} → ${url}`);
    await access(target);
    if (anchor) {
      const targetHtml = target === path ? html : await readFile(target,'utf8');
      if (!targetHtml.includes(`id="${anchor}"`)) throw new Error(`錨點不存在: ${page} → ${url}`);
    }
    links++;
  }
}
if ((await readFile(resolve(out,'AGENTS.txt'),'utf8')) !== (await readFile(resolve(root,'AGENTS.md'),'utf8'))) throw new Error('展示規則未同步');
console.log(`PASS: ${notes.length} notes, ${pages.length} HTML pages, ${links} local links, AGENTS sync.`);
