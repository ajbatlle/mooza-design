// Mooza · generador del kit de recursos gráficos.
// Regenera grillas, celdas, variantes de logo y plantillas (SVG con texto editable + PNG).
// Uso:  npm i playwright && node kit/build-kit.mjs
// Los datos de ejemplo salen de components/grid/poster.js y la geometría de tokens/grid.css
// (margen 6 %, medianil 1,2 %, siete columnas). Las plantillas usan la fuente Geist.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { chromium } = require('playwright');
const P = require(path.join(ROOT, 'components/grid/poster.js'));

// ── colores (tokens/colors.css) ──
const C = { azul: '#1b1444', amarillo: '#fcee21', naranja: '#fbb03b', blanco: '#ffffff', claro: '#f2f2f2' };
const GUIA = '#ff2d6f';

// ── grilla (tokens/grid.css) ──
const W = 1080, MP = 6, GP = 1.2;
const CQ = W / 100, M = MP * CQ, G = GP * CQ, COL = (W - 2 * M - 6 * G) / 7;
function geo(H, rows, story) {
  const mv = story ? M * 2.2 : M, rh = (H - 2 * mv - (rows - 1) * G) / rows;
  return { H, rows, mv, rh,
    x: c => M + (c - 1) * (COL + G), y: r => mv + (r - 1) * (rh + G),
    w: (a, b) => (b - a + 1) * COL + (b - a) * G, h: (a, b) => (b - a + 1) * rh + (b - a) * G };
}
const f2 = n => Math.round(n * 100) / 100;

// ── logo: rutas del logo horizontal oficial ──
const logoSrc = fs.readFileSync(path.join(ROOT, 'assets/logos/logo-horizontal-white.svg'), 'utf8');
const ds = [...logoSrc.matchAll(/ d="([^"]+)"/g)].map(m => m[1]);
const LTEXT = ds.slice(0, 5), LISO = ds[5];
function logo(x, y, w, text, iso) {
  const s = w / 629.21;
  return `<g transform="translate(${f2(x)} ${f2(y)}) scale(${s.toFixed(5)})"><g fill="${text}">${LTEXT.map(d => `<path d="${d}"/>`).join('')}</g><path fill="${iso}" d="${LISO}"/></g>`;
}
const LH = w => w * 159.59 / 629.21;

const out = (rel, text) => { const f = path.join(ROOT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, text); };

// ── métricas de fuente, medidas en el navegador ──
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
const FONTS = 'https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap';
await page.setContent(`<link rel="stylesheet" href="${FONTS}"><body style="margin:0"><span style="font:600 40px 'Geist'">x</span></body>`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const MET = await page.evaluate(() => {
  const m = (font) => { const c = document.createElement('canvas').getContext('2d'); c.font = font; const t = c.measureText('Hxg'); return { asc: t.fontBoundingBoxAscent / 100, desc: t.fontBoundingBoxDescent / 100 }; };
  return { grot: m("500 100px 'Geist'") };
});

// baseline de una línea cuya caja empieza en `top` y mide `lh` px
const base = (top, lh, size, m) => top + (lh - (m.asc + m.desc) * size) / 2 + m.asc * size;
function text(o) {
  const fam = "'Geist', 'Helvetica Neue', Arial, sans-serif";
  const ls = o.ls ? ` letter-spacing="${o.ls}"` : '';
  const tx = o.t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  return `<text x="${f2(o.x)}" y="${f2(o.y)}" font-family="${fam}" font-size="${f2(o.size)}" font-weight="${o.w}" fill="${o.fill}" text-anchor="${o.anchor || 'start'}"${ls}${o.upper ? ' style="text-transform:uppercase"' : ''}>${tx}</text>`;
}
const wrap = (H, body, bg, title) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">\n<title>${title}</title>\n<style>@import url('${FONTS.replace(/&/g, '&amp;')}');</style>\n<rect width="${W}" height="${H}" fill="${bg}"/>\n${body}\n</svg>\n`;
const lines = s => s.split('<br>');

// ── plantillas ──
// Cada plantilla se monta con components/grid/poster.js a 1080 px de ancho y se lee del navegador:
// rectángulos, logo y cada línea de texto con su posición real. Así el kit no puede diverger del generador.
const lienzo = await browser.newPage({ viewport: { width: W, height: 1920 } });
await lienzo.goto('file://' + path.join(ROOT, 'components/grid/preview.html'), { waitUntil: 'networkidle' });
async function leer(tipo, formato) {
  return lienzo.evaluate(async ([tipo, f, W]) => {
    await document.fonts.ready;
    const host = document.createElement('div'); host.style.cssText = 'width:' + W + 'px;position:absolute;left:0;top:0'; document.body.appendChild(host);
    const el = document.createElement('div'); host.appendChild(el); MoozaPoster.mount(el, tipo, null, f);
    await new Promise(r => requestAnimationFrame(r));
    const box = el.getBoundingClientRect(), items = [];
    const rc = e => { const r = e.getBoundingClientRect(); return { x: r.left - box.left, y: r.top - box.top, w: r.width, h: r.height }; };
    const col = s => { const p = s.match(/rgba?\(([^)]+)\)/)[1].split(',').map(Number); return { hex: '#' + p.slice(0, 3).map(v => Math.round(v).toString(16).padStart(2, '0')).join(''), a: p.length > 3 ? p[3] : 1 }; };
    const bg = col(getComputedStyle(el).backgroundColor).hex;
    el.querySelectorAll('.mz-zona,.mz-zona-a,.mz-mitad,.mz-ph,.mz-dc').forEach(e => {
      const c = col(getComputedStyle(e).backgroundColor);
      if (e.classList.contains('mz-dc') && !e.classList.contains('mz-dc-on')) items.push({ k: 'stroke', ...rc(e) });
      else if (c.a > 0) items.push({ k: 'rect', ...rc(e), fill: c.hex });
    });
    el.querySelectorAll('.mz-hora-on span').forEach(e => { const r = rc(e), bw = parseFloat(getComputedStyle(e).borderBottomWidth); items.push({ k: 'rect', x: r.x, y: r.y + r.h - bw, w: r.w, h: bw, fill: '#fbb03b' }); });
    const lg = el.querySelector('.mz-logo');
    if (lg) { const cs = getComputedStyle(lg); items.push({ k: 'logo', ...rc(lg), text: col(cs.color).hex, iso: (() => { const t = document.createElement('i'); t.style.color = 'var(--mz-iso)'; lg.parentElement.appendChild(t); const h = col(getComputedStyle(t).color).hex; t.remove(); return h; })() }); }
    const ctx = document.createElement('canvas').getContext('2d');
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let n;
    while ((n = walker.nextNode())) {
      if (!n.textContent.trim() || n.parentElement.closest('svg')) continue;
      const pe = n.parentElement, cs = getComputedStyle(pe), c = col(cs.color), size = parseFloat(cs.fontSize);
      ctx.font = cs.fontWeight + ' ' + size + 'px ' + cs.fontFamily;
      const asc = ctx.measureText('x').fontBoundingBoxAscent, rg = document.createRange(), txt = n.textContent, lines = [];
      let cur = null;
      for (let i = 0; i < txt.length; i++) {
        rg.setStart(n, i); rg.setEnd(n, i + 1);
        const r = rg.getClientRects()[0]; if (!r) continue;
        if (cur && Math.abs(r.top - cur.top) < 3) { cur.s += txt[i]; cur.r = Math.max(cur.r, r.right); }
        else if (txt[i].trim()) { cur = { s: txt[i], top: r.top, l: r.left, r: r.right }; lines.push(cur); }
      }
      for (const L of lines) {
        const right = cs.textAlign === 'right';
        items.push({ k: 'text', t: L.s.trim(), x: (right ? L.r : L.l) - box.left, y: L.top - box.top + asc, anchor: right ? 'end' : 'start',
          serif: false, size, w: cs.fontWeight, ls: cs.letterSpacing === 'normal' ? 0 : parseFloat(cs.letterSpacing),
          fill: c.hex, op: c.a * parseFloat(cs.opacity) });
      }
    }
    host.remove();
    return { H: box.height, bg, items };
  }, [tipo, formato, W]);
}
async function plantilla(tipo, formato) {
  const { H, bg, items } = await leer(tipo, formato), B = [];
  for (const i of items) {
    if (i.k === 'rect') B.push(`<rect x="${f2(i.x)}" y="${f2(i.y)}" width="${f2(i.w)}" height="${f2(i.h)}" fill="${i.fill}"/>`);
    else if (i.k === 'stroke') B.push(`<rect x="${f2(i.x + 1.25)}" y="${f2(i.y + 1.25)}" width="${f2(i.w - 2.5)}" height="${f2(i.h - 2.5)}" fill="none" stroke="${C.azul}" stroke-width="2.5"/>`);
    else if (i.k === 'logo') B.push(logo(i.x, i.y, i.w, i.text, i.iso));
    else B.push(text({ x: i.x, y: i.y, size: i.size, w: i.w, fam: i.serif ? 'serif' : 'grot', fill: i.op < 1 ? `rgba(${[1, 3, 5].map(k => parseInt(i.fill.slice(k, k + 2), 16)).join(',')},${f2(i.op)})` : i.fill, ls: i.ls ? f2(i.ls) : 0, anchor: i.anchor, t: i.t }));
  }
  return { H, svg: wrap(H, B.join('\n'), bg, 'Mooza · cartel ' + tipo + (formato ? ' ' + formato : '')) };
}

// ── grillas (capa de guías) ──
function grilla(H, rows, story, name, label) {
  const g = geo(H, rows, story), B = [];
  B.push(`<rect x="${f2(M)}" y="${f2(g.mv)}" width="${f2(W - 2 * M)}" height="${f2(H - 2 * g.mv)}" fill="none" stroke="${GUIA}" stroke-width="2" stroke-dasharray="10 8"/>`);
  for (let r = 1; r <= rows; r++) for (let c = 1; c <= 7; c++)
    B.push(`<rect x="${f2(g.x(c))}" y="${f2(g.y(r))}" width="${f2(COL)}" height="${f2(g.rh)}" fill="${GUIA}" fill-opacity=".08" stroke="${GUIA}" stroke-opacity=".6" stroke-width="1.5"/>`);
  out(`kit/grillas/${name}.svg`, `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">\n<title>${label}. Margen 6 %, medianil 1,2 %, siete columnas. Usar como capa de guías.</title>\n${B.join('\n')}\n</svg>\n`);
}
grilla(1350, 9, false, 'grilla-4x5-9filas', 'Grilla 4:5, 9 filas');
grilla(1920, 16, true, 'grilla-9x16-16filas', 'Grilla 9:16, 16 filas');
grilla(1080 * 420 / 297, 11, false, 'grilla-a3-11filas', 'Grilla A3 vertical, 11 filas');
grilla(1080, 8, false, 'grilla-1x1-8filas', 'Grilla 1:1, 8 filas');
grilla(1080 * 9 / 16, 4, false, 'grilla-16x9-4filas', 'Grilla 16:9, 4 filas');

// ── celdas ──
for (const [n, v] of Object.entries(C))
  out(`kit/celdas/celda-${n}.svg`, `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><title>Celda ${n}</title><rect width="100" height="100" fill="${v}"/></svg>\n`);
for (const n of ['azul', 'blanco', 'amarillo'])
  out(`kit/celdas/celda-contorno-${n}.svg`, `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><title>Celda de contorno ${n}</title><rect x="1" y="1" width="98" height="98" fill="none" stroke="${C[n]}" stroke-width="2"/></svg>\n`);

// ── variantes de logo (derivadas del horizontal e ícono oficiales) ──
const isoSrc = fs.readFileSync(path.join(ROOT, 'assets/logos/logo-iso-color.svg'), 'utf8');
const ISO = [...isoSrc.matchAll(/ d="([^"]+)"/g)].map(m => m[1])[0];
for (const [n, v] of [['azul', C.azul], ['amarillo', C.amarillo]]) {
  out(`kit/marca/logo-horizontal-${n}.svg`, `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 629.21 159.59"><title>Mooza, horizontal ${n}</title><g fill="${v}">${LTEXT.map(d => `<path d="${d}"/>`).join('')}<path d="${LISO}"/></g></svg>\n`);
  out(`kit/marca/logo-iso-${n}.svg`, `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168.34 163.27"><title>Ícono de Mooza ${n}</title><path fill="${v}" d="${ISO}"/></svg>\n`);
}

// ── foto de ejemplo ──
out('kit/fotos/foto-placeholder.svg', `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><title>Marcador de foto de evento</title><rect width="100" height="100" fill="${C.azul}"/><text x="6" y="94" font-family="'Geist',Arial,sans-serif" font-size="5" font-weight="500" fill="rgba(255,255,255,.7)">foto del evento</text></svg>\n`);

// ── escribir plantillas y PNG ──
const LISTA = [], HOJA = [];
const SUF = { '4x5': '', a3: '-a3', '1x1': '-1x1', '16x9': '-16x9', '9x16': '' };
for (const [tipo, fs] of Object.entries(P.ROWS)) for (const f of Object.keys(fs)) LISTA.push([tipo + SUF[f], tipo, f]);
for (const f of fs.readdirSync(path.join(ROOT, 'kit/plantillas'))) fs.unlinkSync(path.join(ROOT, 'kit/plantillas', f));
for (const [nombre, tipo, f] of LISTA) {
  const { H, svg } = await plantilla(tipo, f);
  out(`kit/plantillas/${nombre}.svg`, svg);
  HOJA.push({ nombre, tipo, f, H, W: f === '16x9' ? 1920 : 1080, svg });
  const pg = await browser.newPage({ viewport: { width: W, height: Math.ceil(H) } });
  await pg.setContent(`<link rel="stylesheet" href="${FONTS}"><body style="margin:0;background:#fff">${svg.replace(/<\?xml[^>]*>\s*/, '')}</body>`, { waitUntil: 'networkidle' });
  await pg.evaluate(() => document.fonts.ready);
  await pg.waitForTimeout(300);
  await pg.screenshot({ path: path.join(ROOT, `kit/plantillas/${nombre}.png`), clip: { x: 0, y: 0, width: W, height: Math.ceil(H) } });
  await pg.close();
}

// ── un solo archivo con todas las plantillas, para trabajar en Illustrator, Figma o Inkscape ──
// Una fila por formato; cada plantilla es un grupo con id (por ejemplo "titular-4x5") y su rótulo encima.
const FILAS = [['4x5', 'Instagram 4:5'], ['a3', 'A3 vertical'], ['1x1', 'Cuadrado 1:1'], ['16x9', 'Horizontal 16:9'], ['9x16', 'Story 9:16']];
const GAP = 140, ROT = 96, MARG = 100;
let y = MARG, ancho = 0, G_ = [];
for (const [f, rotulo] of FILAS) {
  const fila = HOJA.filter(h => h.f === f); if (!fila.length) continue;
  const alto = Math.max(...fila.map(h => h.H));
  G_.push(`<text x="${MARG}" y="${y + 34}" font-family="'Geist', 'Helvetica Neue', Arial, sans-serif" font-size="34" font-weight="600" fill="${C.azul}">${rotulo}</text>`);
  let x = MARG;
  for (const h of fila) {
    const cuerpo = h.svg.slice(h.svg.indexOf('</style>') + 8, h.svg.lastIndexOf('</svg>')).trim();
    G_.push(`<g id="${h.tipo}-${f}" transform="translate(${x} ${f2(y + ROT)})">\n<text x="0" y="-14" font-family="'Geist', 'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="500" fill="${C.azul}" fill-opacity=".6">${h.tipo} · ${f}</text>\n${cuerpo}\n</g>`);
    x += h.W + GAP;
  }
  ancho = Math.max(ancho, x - GAP + MARG);
  y += ROT + alto + GAP;
}
const hojaSvg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ancho} ${f2(y - GAP + MARG)}" width="${ancho}" height="${f2(y - GAP + MARG)}">\n<title>Mooza · todas las plantillas</title>\n<style>@import url('${FONTS.replace(/&/g, '&amp;')}');</style>\n<rect width="${ancho}" height="${f2(y - GAP + MARG)}" fill="#e6e6e6"/>\n${G_.join('\n')}\n</svg>\n`;
out('kit/mooza-carteles.svg', hojaSvg);
{
  const pg = await browser.newPage({ viewport: { width: 2400, height: 1200 } });
  await pg.setContent(`<link rel="stylesheet" href="${FONTS}"><body style="margin:0;background:#e6e6e6"><img id="i" style="width:2400px;display:block" src="data:image/svg+xml;base64,${Buffer.from(hojaSvg).toString('base64')}">`, { waitUntil: 'networkidle' });
  await pg.waitForTimeout(500);
  await pg.evaluate(() => document.fonts.ready);
  const box = await (await pg.$('#i')).boundingBox();
  await pg.setViewportSize({ width: 2400, height: Math.ceil(box.height) });
  await pg.screenshot({ path: path.join(ROOT, 'kit/mooza-carteles.png'), clip: { x: 0, y: 0, width: 2400, height: Math.ceil(box.height) } });
  await pg.close();
}
await browser.close();
console.log('Kit generado en', path.join(ROOT, 'kit'), LISTA.length, 'plantillas');
