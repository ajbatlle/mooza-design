// Mooza · generador del kit de recursos gráficos.
// Regenera grillas, celdas, variantes de logo y plantillas (SVG con texto editable + PNG).
// Uso:  npm i playwright && node kit/build-kit.mjs
// Los datos de ejemplo salen de components/grid/poster.js y la geometría de tokens/grid.css
// (margen 6 %, medianil 1,2 %, siete columnas). Las plantillas usan las fuentes Newsreader e Inter Tight.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { chromium } = require('playwright');
const P = require(path.join(ROOT, 'components/grid/poster.js'));
const D = P.EJEMPLO;

// ── colores (tokens/colors.css) ──
const C = { noche: '#03021b', azul: '#1b1444', amarillo: '#fcee21', naranja: '#fbb03b', blanco: '#ffffff', claro: '#f2f2f2' };
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
const FONTS = 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300..800&family=Newsreader:ital,opsz,wght@0,6..72,300..700&display=swap';
await page.setContent(`<link rel="stylesheet" href="${FONTS}"><body style="margin:0"><span style="font:500 40px Newsreader">x</span><span style="font:600 40px 'Inter Tight'">x</span></body>`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const MET = await page.evaluate(() => {
  const m = (font) => { const c = document.createElement('canvas').getContext('2d'); c.font = font; const t = c.measureText('Hxg'); return { asc: t.fontBoundingBoxAscent / 100, desc: t.fontBoundingBoxDescent / 100 }; };
  return { serif: m("500 100px Newsreader"), grot: m("600 100px 'Inter Tight'") };
});

// baseline de una línea cuya caja empieza en `top` y mide `lh` px
const base = (top, lh, size, m) => top + (lh - (m.asc + m.desc) * size) / 2 + m.asc * size;
function text(o) {
  const fam = o.fam === 'serif' ? "'Newsreader', Georgia, serif" : "'Inter Tight', 'Helvetica Neue', Arial, sans-serif";
  const ls = o.ls ? ` letter-spacing="${o.ls}"` : '';
  const tx = o.t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  return `<text x="${f2(o.x)}" y="${f2(o.y)}" font-family="${fam}" font-size="${f2(o.size)}" font-weight="${o.w}" fill="${o.fill}" text-anchor="${o.anchor || 'start'}"${ls}${o.upper ? ' style="text-transform:uppercase"' : ''}>${tx}</text>`;
}
const wrap = (H, body, bg, title) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">\n<title>${title}</title>\n<style>@import url('${FONTS.replace(/&/g, '&amp;')}');</style>\n<rect width="${W}" height="${H}" fill="${bg}"/>\n${body}\n</svg>\n`;
const lines = s => s.split('<br>');

// ── plantillas ──
const T = {};

// pie: la última fila de todo cartel. El logo mide dos columnas, va a la izquierda y se alinea al borde inferior de la fila;
// la fecha va a la derecha, con su línea base en ese mismo borde. Nada más entra en esa fila.
function pie(g, n, fecha) {
  const B = [], bottom = g.y(n) + g.rh;
  let lw = 2 * COL + G; if (LH(lw) > g.rh) lw = g.rh / (159.59 / 629.21);
  B.push(logo(g.x(1), bottom - LH(lw), lw, C.noche, C.noche));
  if (fecha) B.push(text({ x: g.x(7) + COL, y: bottom, size: COL * .3, w: 500, fam: 'grot', fill: C.noche, anchor: 'end', t: fecha }));
  return B;
}

T.semana = (H = 1350, n = 10) => {
  const g = geo(H, n), B = [];
  const fd = 3.2 * CQ;
  'LMMJVSD'.split('').forEach((l, i) => B.push(text({ x: g.x(i + 1) + COL / 2, y: g.y(1) + g.rh - .6 * CQ - MET.grot.desc * fd, size: fd, w: 500, fam: 'grot', fill: C.noche, anchor: 'middle', t: l })));
  const F = {}; const PR = { y: 3, w: 2, n: 1 };
  D.semana.forEach((dia, i) => dia.e.forEach(e => { const k = e.f ? 'y' : (/gratis/i.test(e.p) ? 'w' : 'n'), key = (i + 1) + '-' + P.franja(e.s, n); if (!F[key] || PR[k] > PR[F[key]]) F[key] = k; }));
  const fill = { y: C.amarillo, w: C.blanco, n: C.noche };
  for (let r = 2; r <= n - 1; r++) for (let c = 1; c <= 7; c++) {
    const k = F[c + '-' + r], x = g.x(c), y = g.y(r);
    B.push(k ? `<rect x="${f2(x)}" y="${f2(y)}" width="${f2(COL)}" height="${f2(g.rh)}" fill="${fill[k]}"/>`
             : `<rect x="${f2(x + 1.25)}" y="${f2(y + 1.25)}" width="${f2(COL - 2.5)}" height="${f2(g.rh - 2.5)}" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="2.5"/>`);
  }
  B.push(...pie(g, n, D.rango));
  return wrap(H, B.join('\n'), C.naranja, 'Mooza · cartel semana');
};

T.foto = (H = 1350, n = 9) => {
  const g = geo(H, n), B = [], fl = 2.8 * CQ;
  const foto = (px, py, pw, ph) => {
    B.push(`<rect x="${f2(px)}" y="${f2(py)}" width="${f2(pw)}" height="${f2(ph)}" fill="${C.azul}"/>`);
    B.push(text({ x: px + 2 * CQ, y: py + ph - 2 * CQ - MET.grot.desc * fl, size: fl, w: 500, fam: 'grot', fill: 'rgba(255,255,255,.7)', t: 'foto del evento' }));
  };
  const titulo = (bottom, factor) => {
    const fs = COL * 1.52 * factor, lh = .9 * fs, ls = lines(D.titularFoto), top = bottom - ls.length * lh;
    ls.forEach((l, i) => B.push(text({ x: M, y: base(top + i * lh, lh, fs, MET.serif), size: fs, w: 500, fam: 'serif', fill: C.noche, ls: f2(-.035 * fs), t: l })));
  };
  if (n === 4) { // horizontal 16:9: titular a la izquierda, foto a la derecha
    foto(g.x(5), g.y(1), g.w(5, 7), g.h(1, 3));
    titulo(g.y(3) + g.rh, .62);
  } else {
    foto(g.x(3), g.y(1), g.w(3, 7), g.h(1, n - 4));
    titulo(g.y(n - 1) + g.rh, n === 8 ? .82 : (n === 11 ? .92 : 1));
  }
  B.push(...pie(g, n, D.rango));
  return wrap(H, B.join('\n'), C.blanco, n === 4 ? 'Mooza · cartel foto 16:9' : 'Mooza · cartel foto');
};

T.grafico = (H = 1350, n = 9) => {
  const g = geo(H, n), B = [];
  const fs = COL * 2.17, lh = .74 * fs;
  B.push(text({ x: M, y: base(g.y(1), lh, fs, MET.grot), size: fs, w: 600, fam: 'grot', fill: C.noche, ls: f2(-.05 * fs), t: D.corto }));
  const hh = g.h(3, n - 1);
  D.semana.forEach((dia, i) => {
    const x = g.x(i + 1), y = g.y(3);
    B.push(`<rect x="${f2(x + 1.25)}" y="${f2(y + 1.25)}" width="${f2(COL - 2.5)}" height="${f2(hh - 2.5)}" fill="none" stroke="rgba(3,2,27,.5)" stroke-width="2.5"/>`);
    dia.e.forEach(e => {
      const t = (e.s - 10) / 14, h = (e.e - e.s) / 14;
      B.push(`<rect x="${f2(x + .12 * COL)}" y="${f2(y + t * hh)}" width="${f2(.76 * COL)}" height="${f2(h * hh)}" fill="${e.f ? C.blanco : C.noche}"/>`);
    });
  });
  B.push(...pie(g, n, D.rango));
  return wrap(H, B.join('\n'), C.amarillo, 'Mooza · cartel gráfico');
};

T.editorial = (H = 1350, n = 9) => {
  const g = geo(H, n), B = [], SQ = { n: C.naranja, y: C.amarillo, a: C.azul, k: C.noche };
  const cc = Math.floor((3 + n - 2) / 2), fila = v => v === 'c' ? cc : v === 'c+1' ? cc + 1 : (v < 0 ? n + v : v);
  D.cuadrados.forEach(s => { const a = fila(s[2]), b = fila(s[3]); B.push(`<rect x="${f2(g.x(s[0]))}" y="${f2(g.y(a))}" width="${f2(g.w(s[0], s[1]))}" height="${f2(g.h(a, b))}" fill="${SQ[s[4]]}"/>`); });
  const fs = COL * 1.04, lh = .93 * fs, ls = lines(D.titularEditorial), rt = g.y(3), rh = g.h(3, n - 2), top = rt + (rh - ls.length * lh) / 2;
  ls.forEach((l, i) => B.push(text({ x: W / 2, y: base(top + i * lh, lh, fs, MET.serif), size: fs, w: 500, fam: 'serif', fill: C.noche, anchor: 'middle', ls: f2(-.035 * fs), t: l })));
  B.push(...pie(g, n, 'mooza.cl'));
  return wrap(H, B.join('\n'), C.claro, 'Mooza · cartel editorial');
};

T.story = () => {
  const g = geo(1920, 16, true), B = [], s = D.story;
  for (let r = 1; r <= 2; r++) for (let c = 1; c <= 7; c++) {
    const on = r === 2 && c === s.dia + 1, cx = g.x(c) + COL / 2, cy = g.y(r) + g.rh / 2;
    B.push(`<circle cx="${f2(cx)}" cy="${f2(cy)}" r="${on ? f2(1.3 * CQ) : f2(.55 * CQ)}" fill="${on ? C.naranja : C.noche}"${on ? '' : ' fill-opacity=".5"'}/>`);
  }
  const fe = COL * .28, lbh = (MET.grot.asc + MET.grot.desc) * fe, ty = g.y(4) + (g.rh - lbh) / 2, sq = 2.4 * CQ;
  B.push(`<rect x="${f2(M)}" y="${f2(g.y(4) + (g.rh - sq) / 2)}" width="${f2(sq)}" height="${f2(sq)}" fill="${C.naranja}"/>`);
  B.push(text({ x: M + sq + 2 * CQ, y: ty + MET.grot.asc * fe, size: fe, w: 600, fam: 'grot', fill: C.noche, ls: f2(.14 * fe), t: s.categoria.toUpperCase() }));
  const fs = COL * 1.05, lh = .95 * fs;
  lines(s.titulo).forEach((l, i) => B.push(text({ x: M, y: base(g.y(5) + i * lh, lh, fs, MET.serif), size: fs, w: 500, fam: 'serif', fill: C.noche, ls: f2(-.03 * fs), t: l })));
  const fm = COL * .33, lm = 1.3 * fm;
  lines(s.meta).forEach((l, i) => B.push(text({ x: M, y: base(g.y(8) + i * lm, lm, fm, MET.grot), size: fm, w: 400, fam: 'grot', fill: 'rgba(3,2,27,.72)', t: l })));
  const px = g.x(1), py = g.y(10), pw = g.w(1, 7), ph = g.h(10, 14), fl = 2.8 * CQ;
  B.push(`<rect x="${f2(px)}" y="${f2(py)}" width="${f2(pw)}" height="${f2(ph)}" fill="${C.azul}"/>`);
  B.push(text({ x: px + 2 * CQ, y: py + ph - 2 * CQ - MET.grot.desc * fl, size: fl, w: 500, fam: 'grot', fill: 'rgba(255,255,255,.7)', t: 'foto del evento' }));
  B.push(...pie(g, 16, null));
  return wrap(1920, B.join('\n'), C.claro, 'Mooza · story 9:16');
};

// ── grillas (capa de guías) ──
function grilla(H, rows, story, name, label) {
  const g = geo(H, rows, story), B = [];
  B.push(`<rect x="${f2(M)}" y="${f2(g.mv)}" width="${f2(W - 2 * M)}" height="${f2(H - 2 * g.mv)}" fill="none" stroke="${GUIA}" stroke-width="2" stroke-dasharray="10 8"/>`);
  for (let r = 1; r <= rows; r++) for (let c = 1; c <= 7; c++)
    B.push(`<rect x="${f2(g.x(c))}" y="${f2(g.y(r))}" width="${f2(COL)}" height="${f2(g.rh)}" fill="${GUIA}" fill-opacity=".08" stroke="${GUIA}" stroke-opacity=".6" stroke-width="1.5"/>`);
  out(`kit/grillas/${name}.svg`, `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">\n<title>${label}. Margen 6 %, medianil 1,2 %, siete columnas. Usar como capa de guías.</title>\n${B.join('\n')}\n</svg>\n`);
}
grilla(1350, 9, false, 'grilla-4x5-9filas', 'Grilla 4:5, 9 filas');
grilla(1350, 10, false, 'grilla-4x5-10filas', 'Grilla 4:5, 10 filas');
grilla(1920, 16, true, 'grilla-9x16-16filas', 'Grilla 9:16, 16 filas');
grilla(1080 * 420 / 297, 11, false, 'grilla-a3-11filas', 'Grilla A3 vertical, 11 filas');
grilla(1080, 8, false, 'grilla-1x1-8filas', 'Grilla 1:1, 8 filas');
grilla(1080 * 9 / 16, 4, false, 'grilla-16x9-4filas', 'Grilla 16:9, 4 filas');

// ── celdas ──
for (const [n, v] of Object.entries(C))
  out(`kit/celdas/celda-${n}.svg`, `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><title>Celda ${n}</title><rect width="100" height="100" fill="${v}"${n === 'noche' || n === 'azul' ? '' : ''}/></svg>\n`);
for (const n of ['noche', 'blanco', 'amarillo'])
  out(`kit/celdas/celda-contorno-${n}.svg`, `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><title>Celda de contorno ${n}</title><rect x="1" y="1" width="98" height="98" fill="none" stroke="${C[n]}" stroke-width="2"/></svg>\n`);

// ── variantes de logo (derivadas del horizontal e ícono oficiales) ──
const isoSrc = fs.readFileSync(path.join(ROOT, 'assets/logos/logo-iso-color.svg'), 'utf8');
const ISO = [...isoSrc.matchAll(/ d="([^"]+)"/g)].map(m => m[1])[0];
for (const [n, v] of [['noche', C.noche], ['amarillo', C.amarillo]]) {
  out(`kit/marca/logo-horizontal-${n}.svg`, `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 629.21 159.59"><title>Mooza, horizontal ${n}</title><g fill="${v}">${LTEXT.map(d => `<path d="${d}"/>`).join('')}<path d="${LISO}"/></g></svg>\n`);
  out(`kit/marca/logo-iso-${n}.svg`, `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168.34 163.27"><title>Ícono de Mooza ${n}</title><path fill="${v}" d="${ISO}"/></svg>\n`);
}

// ── foto de ejemplo ──
out('kit/fotos/foto-placeholder.svg', `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><title>Marcador de foto de evento</title><rect width="100" height="100" fill="${C.azul}"/><text x="6" y="94" font-family="'Inter Tight',Arial,sans-serif" font-size="5" font-weight="500" fill="rgba(255,255,255,.7)">foto del evento</text></svg>\n`);

// ── escribir plantillas y PNG ──
const A3 = 1080 * 420 / 297, R169 = 1080 * 9 / 16;
const LISTA = [
  ['semana', 'semana', 1350, 10], ['foto', 'foto', 1350, 9], ['grafico', 'grafico', 1350, 9], ['editorial', 'editorial', 1350, 9], ['story', 'story', 1920, 16],
  ['semana-a3', 'semana', A3, 11], ['foto-a3', 'foto', A3, 11], ['grafico-a3', 'grafico', A3, 11], ['editorial-a3', 'editorial', A3, 11],
  ['semana-1x1', 'semana', 1080, 8], ['foto-1x1', 'foto', 1080, 8], ['grafico-1x1', 'grafico', 1080, 8],
  ['foto-16x9', 'foto', R169, 4]
];
for (const [nombre, tipo, H, n] of LISTA) {
  const svg = tipo === 'story' ? T.story() : T[tipo](H, n);
  out(`kit/plantillas/${nombre}.svg`, svg);
  const pg = await browser.newPage({ viewport: { width: W, height: Math.ceil(H) } });
  await pg.setContent(`<link rel="stylesheet" href="${FONTS}"><body style="margin:0;background:#fff">${svg.replace(/<\?xml[^>]*>\s*/, '')}</body>`, { waitUntil: 'networkidle' });
  await pg.evaluate(() => document.fonts.ready);
  await pg.waitForTimeout(300);
  await pg.screenshot({ path: path.join(ROOT, `kit/plantillas/${nombre}.png`), clip: { x: 0, y: 0, width: W, height: Math.ceil(H) } });
  await pg.close();
}
await browser.close();
console.log('Kit generado en', path.join(ROOT, 'kit'));
