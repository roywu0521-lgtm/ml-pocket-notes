import { readdir, readFile } from 'node:fs/promises';
import { resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
export const root = fileURLToPath(new URL('../', import.meta.url));
export const categories = ['資料準備', '模型觀念', '模型評估'];
export const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const text = x => typeof x === 'string' && x.trim().length > 0;
const date = x => /^\d{4}-\d{2}-\d{2}$/.test(x) && !Number.isNaN(Date.parse(x)) && new Date(x).toISOString().slice(0,10) === x && x <= new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
function ensure(ok, message) { if (!ok) throw new Error(message); }
export async function readNotes() {
  const names = (await readdir(resolve(root, 'content/notes'))).filter(x => x.endsWith('.json')).sort();
  const notes = [];
  for (const name of names) {
    const n = JSON.parse(await readFile(resolve(root, 'content/notes', name), 'utf8'));
    const check = (ok, msg) => ensure(ok, `${name}: ${msg}`);
    check(/^[a-z]+(?:-[a-z0-9]+)*$/.test(n.slug) && basename(name,'.json') === n.slug, 'slug 與檔名不符');
    check(Number.isInteger(n.order) && n.order > 0, 'order 須為正整數');
    for (const key of ['title','summary','pitfall','takeaway']) check(text(n[key]), `缺少 ${key}`);
    check(categories.includes(n.category), '未知分類');
    check(Number.isInteger(n.minutes) && n.minutes >= 1 && n.minutes <= 15, 'minutes 須介於 1–15');
    check(date(n.updated), 'updated 須為有效且非未來日期');
    check(Array.isArray(n.concept) && n.concept.length >= 1 && n.concept.length <= 3 && n.concept.every(text), 'concept 須為 1–3 段');
    check(text(n.example?.title) && n.example.title.startsWith('自編示例') && text(n.example.body), '示例須完整並標示自編');
    check(text(n.quiz?.question) && text(n.quiz.explanation) && Array.isArray(n.quiz.options) && n.quiz.options.length === 3 && n.quiz.options.every(text) && new Set(n.quiz.options).size === 3 && Number.isInteger(n.quiz.answer) && n.quiz.answer >= 0 && n.quiz.answer <= 2, '測驗欄位或選項錯誤');
    check(Array.isArray(n.sources) && n.sources.length > 0 && n.sources.every(s => text(s.title) && /^https:\/\//.test(s.url) && date(s.checked)), '來源須有 HTTPS 網址與查核日期');
    check(Array.isArray(n.related) && n.related.length >= 1 && n.related.length <= 3 && new Set(n.related).size === n.related.length, 'related 須為 1–3 個不同 slug');
    notes.push(n);
  }
  ensure(notes.length > 0, '至少需要一篇筆記');
  ensure(new Set(notes.map(n=>n.slug)).size === notes.length, 'slug 重複');
  ensure(new Set(notes.map(n=>n.order)).size === notes.length, 'order 重複');
  for (const n of notes) ensure(n.related.every(slug=>slug !== n.slug && notes.some(x=>x.slug === slug)), `${n.slug}: 延伸閱讀不存在或指向自己`);
  return notes.sort((a,b)=>a.order-b.order);
}
