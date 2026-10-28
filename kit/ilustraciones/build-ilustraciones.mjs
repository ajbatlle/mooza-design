// Mooza · generador del set de ilustraciones "musas".
// Nueve dibujos de trazo fino, en una tinta o en duotono (tinta + un campo plano desplazado, como un grabado mal registrado).
// Cada uno alude a una musa por un objeto, no por una figura: la lira de Erato, el aulós de Euterpe, las máscaras de Melpómene y Talía,
// la tela de Terpsícore, el rollo y la pluma de Calíope, el ánfora de Clío, la luna de Urania, el ojo de Polimnia y el laurel.
// Uso:  npm i playwright && node kit/ilustraciones/build-ilustraciones.mjs
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.dirname(fileURLToPath(import.meta.url));
const { chromium } = require('playwright');

const C = { azul: '#1b1444', amarillo: '#fcee21', naranja: '#fbb03b', blanco: '#ffffff', claro: '#f2f2f2' };

// ── utilidades de dibujo ──
const r2 = n => Math.round(n * 100) / 100;
const circle = (cx, cy, r) => `M${r2(cx - r)},${r2(cy)} a${r},${r} 0 1,0 ${2 * r},0 a${r},${r} 0 1,0 ${-2 * r},0 Z`;
const star4 = (cx, cy, s) => `M${cx},${cy - s} Q${cx + s * .18},${cy - s * .18} ${cx + s},${cy} Q${cx + s * .18},${cy + s * .18} ${cx},${cy + s} Q${cx - s * .18},${cy + s * .18} ${cx - s},${cy} Q${cx - s * .18},${cy - s * .18} ${cx},${cy - s} Z`;
const bez = (p0, p1, p2, p3, t) => {
  const u = 1 - t, f = (a, b, c, d) => u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
  const dx = 3 * u * u * (p1[0] - p0[0]) + 6 * u * t * (p2[0] - p1[0]) + 3 * t * t * (p3[0] - p2[0]);
  const dy = 3 * u * u * (p1[1] - p0[1]) + 6 * u * t * (p2[1] - p1[1]) + 3 * t * t * (p3[1] - p2[1]);
  return { x: f(p0[0], p1[0], p2[0], p3[0]), y: f(p0[1], p1[1], p2[1], p3[1]), a: Math.atan2(dy, dx) * 180 / Math.PI };
};
const greca = (x0, x1, y, h, s) => { let d = `M${x0},${y}`, up = false; for (let x = x0; x < x1; x += s) { d += ` h${s} v${up ? h : -h}`; up = !up; } return d; };

// Cada dibujo: fill (campo de color), tinta (trazos), relleno de tinta (negros), trama (rayado), tf opcional por trazo.
const D = {};

D['erato-lira'] = () => {
  const lines = [];
  const caja = 'M126,308 C126,270 150,246 200,246 C250,246 274,270 274,308 C274,346 244,364 200,364 C156,364 126,346 126,308 Z';
  const brazoI = 'M136,282 C72,254 72,170 108,98 L127,102 C100,172 104,230 158,258 Z';
  const brazoD = 'M264,282 C328,254 328,170 292,98 L273,102 C300,172 296,230 242,258 Z';
  const barra = 'M104,98 Q200,84 296,98 L296,114 Q200,100 104,114 Z';
  lines.push({ d: caja, w: 2.6 }, { d: brazoI, w: 2.6 }, { d: brazoD, w: 2.6 }, { d: barra, w: 2.6 }, { d: 'M156,300 L244,300', w: 2.6 });
  const cuerdas = []; for (let i = 0; i < 7; i++) cuerdas.push(`M${124 + 25.3 * i},112 L${160 + 13.3 * i},300`);
  cuerdas.forEach(d => lines.push({ d, w: 1.4 }));
  const clavijas = []; for (let i = 0; i < 7; i++) clavijas.push(circle(124 + 25.3 * i, 106, 2.6));
  return {
    fill: [caja, barra], tinta: lines, negro: clavijas,
    trama: ['M200,248 C250,248 274,272 274,308 C274,346 244,364 200,364 C226,348 238,330 238,308 C238,276 224,258 200,248 Z'],
    chispas: [star4(200, 52, 11), star4(322, 150, 7), star4(80, 168, 6)]
  };
};

D['euterpe-aulos'] = () => {
  const tubo = 'M0,-7 L290,-7 L290,7 L0,7 Q-7,7 -7,0 Q-7,-7 0,-7 Z';
  const campana = 'M290,-7 L316,-16 L316,16 L290,7';
  const orif = [170, 195, 220, 245, 268].map(x => circle(x, 0, 3.4)).join(' ');
  const bandas = 'M32,-7 L32,7 M40,-7 L40,7';
  const t1 = 'translate(110 310) rotate(-47)', t2 = 'translate(290 310) rotate(-133)';
  return {
    fill: [{ d: tubo + ' ' + campana, tf: t1 }], tinta: [
      { d: tubo, tf: t1, w: 2.6 }, { d: campana, tf: t1, w: 2.6 }, { d: orif, tf: t1, w: 1.6 }, { d: bandas, tf: t1, w: 1.6 },
      { d: tubo, tf: t2, w: 2.6 }, { d: campana, tf: t2, w: 2.6 }, { d: orif, tf: t2, w: 1.6 }, { d: bandas, tf: t2, w: 1.6 }],
    negro: [], trama: [],
    chispas: [star4(200, 52, 10), star4(70, 200, 6), star4(332, 214, 7)]
  };
};

D['melpomene-talia-mascaras'] = () => {
  const ovalo = 'M155,110 C205,110 225,160 220,215 C215,270 185,300 155,300 C125,300 95,270 90,215 C85,160 105,110 155,110 Z';
  const ojoI = 'M120,178 Q134,166 148,180 Q134,188 120,178 Z', ojoD = 'M162,180 Q176,166 190,178 Q176,188 162,180 Z';
  const triste = 'M128,264 Q155,238 182,264 Q155,252 128,264 Z', alegre = 'M128,246 Q155,278 182,246 Q155,260 128,246 Z';
  const cejasT = 'M114,160 L146,150 M164,150 L196,160', cejasA = 'M114,158 Q128,146 146,152 M164,152 Q182,146 196,158';
  const t1 = 'translate(-10 -10)', t2 = 'translate(120 52) scale(.9)';
  const lines = [
    { d: ovalo, tf: t1, w: 2.6 }, { d: ojoI + ojoD, tf: t1, w: 2 }, { d: triste, tf: t1, w: 2 }, { d: cejasT, tf: t1, w: 2 }, { d: 'M92,214 C70,232 62,262 68,294 M218,214 C238,232 246,262 240,294', tf: t1, w: 1.5 },
    { d: ovalo, tf: t2, w: 2.8 }, { d: ojoI + ojoD, tf: t2, w: 2.2 }, { d: alegre, tf: t2, w: 2.2 }, { d: cejasA, tf: t2, w: 2.2 }, { d: 'M92,214 C70,232 62,262 68,294 M218,214 C238,232 246,262 240,294', tf: t2, w: 1.6 }];
  return {
    fill: [{ d: ovalo, tf: t1 }], tinta: lines, negro: [],
    trama: [{ d: 'M155,110 C205,110 225,160 220,215 C215,270 185,300 155,300 C190,280 200,250 200,215 C200,170 185,128 155,110 Z', tf: t2 }],
    chispas: [star4(300, 120, 8), star4(60, 300, 6)]
  };
};

D['terpsicore-tela'] = () => {
  const cinta = 'M70,342 C120,242 40,192 120,142 C200,94 150,62 240,36 L284,52 C198,86 244,124 168,172 C98,216 162,252 106,352 Z';
  return {
    fill: [cinta], tinta: [
      { d: cinta, w: 2.6 },
      { d: 'M88,346 C140,250 62,204 144,158 C214,118 180,78 262,44', w: 1.3 },
      { d: 'M240,36 C256,22 276,28 272,46 C268,58 256,54 258,46', w: 2 },
      { d: 'M82,304 C106,262 76,224 118,186 M98,324 C124,272 92,238 134,198', w: 1.2 }],
    negro: [], trama: ['M168,172 C244,124 198,86 284,52 L262,44 C180,78 214,118 144,158 Z'],
    chispas: [star4(330, 104, 9), star4(128, 70, 7), star4(76, 250, 5)]
  };
};

D['caliope-rollo-pluma'] = () => {
  const papel = 'M122,112 L262,112 L262,288 L122,288 Z';
  const rolloS = 'M121,86 H267 A13,13 0 0 1 267,112 H121 A13,13 0 0 1 121,86 Z', rolloI = 'M121,288 H267 A13,13 0 0 1 267,314 H121 A13,13 0 0 1 121,288 Z';
  const lin = []; [138, 160, 182, 204, 226, 248, 268].forEach((y, i) => { const n = i === 6 ? 3 : (i % 2 ? 6 : 5); lin.push({ d: `M140,${y} q10,-6 20,0` + ' t20,0'.repeat(n - 1), w: 1.3 }); });
  const pluma = 'M338,64 C394,128 352,228 238,300 L224,290 C252,216 302,134 338,64 Z';
  const E = [[338, 64], [318, 150], [282, 230], [232, 292]]; let barbas = '';
  for (let t = .1; t < .88; t += .075) { const p = bez(E[0], E[1], E[2], E[3], t), L = 40 * Math.pow(Math.sin(Math.PI * t), .6); [-1, 1].forEach(s => { const a = (p.a + 180 + s * 55) * Math.PI / 180; barbas += `M${r2(p.x)},${r2(p.y)} l${r2(L * Math.cos(a))},${r2(L * Math.sin(a))} `; }); }
  return {
    fill: [papel], tinta: [{ d: papel, w: 2.4 }, { d: rolloS, w: 2.6 }, { d: rolloI, w: 2.6 }, ...lin, { d: pluma, w: 2.6 }, { d: 'M338,64 C318,150 282,230 232,292', w: 1.8 }, { d: barbas, w: 1.2 }],
    negro: [circle(121, 99, 4), circle(267, 99, 4), circle(121, 301, 4), circle(267, 301, 4)],
    trama: ['M338,64 C318,150 282,230 232,292 L224,290 C252,216 302,134 338,64 Z'],
    chispas: [star4(74, 110, 8), star4(74, 280, 5)]
  };
};

D['clio-anfora'] = () => {
  const cuerpo = 'M170,64 Q200,56 230,64 L224,82 C236,96 236,122 234,138 C298,148 330,212 292,282 C272,322 242,344 200,348 C158,344 128,322 108,282 C70,212 102,148 166,138 C164,122 164,96 176,82 Z';
  const asas = 'M234,124 C300,98 322,172 276,196 M166,124 C100,98 78,172 124,196';
  return {
    fill: [cuerpo], clip: cuerpo, tinta: [
      { d: cuerpo, w: 2.6 }, { d: asas, w: 2 }, { d: 'M176,82 H224 M170,64 H230', w: 1.6 },
      { d: 'M80,204 H320 M80,232 H320', w: 1.6, clip: true }, { d: greca(80, 320, 232, 28, 14), w: 1.5, clip: true }],
    negro: [], trama: [{ d: 'M262,150 C306,206 298,276 262,316 C250,330 232,340 212,346 C246,310 266,250 262,150 Z', clip: true }],
    chispas: [star4(66, 120, 7), star4(336, 100, 8), star4(336, 320, 5)]
  };
};

D['urania-luna'] = () => {
  const c1 = [190, 200, 100], c2 = [240, 190, 84];
  const dx = c2[0] - c1[0], dy = c2[1] - c1[1], d = Math.hypot(dx, dy), a = (c1[2] ** 2 - c2[2] ** 2 + d * d) / (2 * d), h = Math.sqrt(c1[2] ** 2 - a * a);
  const mx = c1[0] + a * dx / d, my = c1[1] + a * dy / d;
  const p1 = [mx + h * dy / d, my - h * dx / d], p2 = [mx - h * dy / d, my + h * dx / d];
  const [top, bot] = p1[1] < p2[1] ? [p1, p2] : [p2, p1];
  const luna = `M${r2(top[0])},${r2(top[1])} A${c1[2]},${c1[2]} 0 1 0 ${r2(bot[0])},${r2(bot[1])} A${c2[2]},${c2[2]} 0 1 1 ${r2(top[0])},${r2(top[1])} Z`;
  return {
    fill: [luna], tinta: [{ d: luna, w: 2.6 }, { d: circle(200, 200, 150), w: 1.6, dash: '0.1 9' }],
    negro: [], trama: ['M106,150 C96,190 102,230 122,262 C100,236 92,196 106,150 Z'],
    chispas: [star4(300, 108, 13), star4(330, 220, 8), star4(262, 322, 9), star4(112, 78, 6)]
  };
};

D['polimnia-ojo'] = () => {
  const ojo = 'M54,204 Q200,100 346,204 Q200,308 54,204 Z';
  const rayos = []; for (let ang = -150; ang <= -30; ang += 15) { const t = ang * Math.PI / 180; rayos.push(`M${r2(200 + 86 * Math.cos(t))},${r2(204 + 86 * Math.sin(t))} L${r2(200 + 124 * Math.cos(t))},${r2(204 + 124 * Math.sin(t))}`); }
  return {
    fill: [circle(200, 204, 46)], tinta: [{ d: ojo, w: 2.6 }, { d: circle(200, 204, 46), w: 2.2 }, { d: rayos.join(' '), w: 1.6 }, { d: 'M96,226 Q130,252 164,262 M304,226 Q270,252 236,262', w: 1.2 }],
    negro: [circle(200, 204, 17)], trama: ['M170,222 A34,34 0 0 0 232,222 Q200,244 170,222 Z'],
    chispas: [star4(200, 52, 9), star4(64, 110, 6), star4(338, 110, 6)]
  };
};

D['laurel'] = () => {
  const P = [[104, 338], [150, 250], [244, 204], [302, 96]];
  const hoja = 'M0,0 C8,-12 28,-16 44,0 C28,16 8,12 0,0 Z', vena = 'M2,0 L38,0';
  const fill = [], tinta = [{ d: `M${P[0][0]},${P[0][1]} C${P[1][0]},${P[1][1]} ${P[2][0]},${P[2][1]} ${P[3][0]},${P[3][1]}`, w: 2.4 }];
  let k = 0;
  for (let t = .1; t < .97; t += .085) {
    const p = bez(P[0], P[1], P[2], P[3], t), s = 1.12 - .62 * t;
    [-52, 52].forEach(off => { const tf = `translate(${r2(p.x)} ${r2(p.y)}) rotate(${r2(p.a + off)}) scale(${r2(s)})`; tinta.push({ d: hoja, tf, w: 2 }, { d: vena, tf, w: 1 }); if ((k++ % 2) === 0) fill.push({ d: hoja, tf }); });
  }
  const tip = bez(P[0], P[1], P[2], P[3], 1);
  tinta.push({ d: `M${r2(tip.x)},${r2(tip.y)} l${r2(14 * Math.cos(tip.a * Math.PI / 180))},${r2(14 * Math.sin(tip.a * Math.PI / 180))}`, w: 2 });
  return { fill, tinta, negro: [circle(118, 318, 4), circle(130, 330, 3.4), circle(108, 306, 3)], trama: [], chispas: [star4(86, 110, 8), star4(340, 250, 7), star4(120, 60, 5)] };
};

// ── ensamblado ──
const filtro = `<filter id="mano" x="-4%" y="-4%" width="108%" height="108%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="3.4" xChannelSelector="R" yChannelSelector="G"/></filter>`;
const dp = (o, extra = '') => typeof o === 'string' ? `<path d="${o}"${extra}/>` : `<path d="${o.d}"${o.tf ? ` transform="${o.tf}"` : ''}${o.clip ? ' clip-path="url(#cl)"' : ''}${extra}/>`;

function svg(name, v) {
  const g = D[name](), ink = v.tinta, fill = v.campo, hasFill = !!fill;
  const cl = g.clip ? `<clipPath id="cl"><path d="${g.clip}"/></clipPath>` : '';
  const tinta = g.tinta.map(o => `<path d="${o.d}"${o.tf ? ` transform="${o.tf}"` : ''}${o.clip ? ' clip-path="url(#cl)"' : ''} stroke-width="${o.w}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}/>`).join('');
  const relleno = hasFill ? `<g transform="translate(6 5)" fill="${fill}" stroke="none">${g.fill.map(o => dp(o)).join('')}</g>` : '';
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="800" height="800">
<title>${name} (${v.id})</title>
<defs>${filtro}<pattern id="trama" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(40)"><line x1="0" y1="0" x2="0" y2="5" stroke="${ink}" stroke-width="1.1"/></pattern>${cl}</defs>
<g filter="url(#mano)">
${relleno}
<g fill="url(#trama)" stroke="none">${g.trama.map(o => dp(o)).join('')}</g>
<g fill="none" stroke="${ink}" stroke-linecap="round" stroke-linejoin="round">${tinta}</g>
<g fill="${ink}" stroke="none">${g.negro.map(o => dp(o)).join('')}</g>
<g fill="none" stroke="${ink}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${g.chispas.map(o => dp(o)).join('')}</g>
</g>
</svg>
`;
}

const VARIANTES = [
  { id: 'tinta', tinta: C.azul, campo: null, fondo: C.claro },
  { id: 'amarillo', tinta: C.azul, campo: C.amarillo, fondo: C.claro },
  { id: 'naranja', tinta: C.azul, campo: C.naranja, fondo: C.claro },
  { id: 'claro', tinta: C.claro, campo: C.amarillo, fondo: C.azul }
];
fs.mkdirSync(path.join(OUT, 'svg'), { recursive: true });
for (const n of Object.keys(D)) for (const v of VARIANTES) fs.writeFileSync(path.join(OUT, 'svg', `${n}-${v.id}.svg`), svg(n, v));

// ── hoja de muestra (PNG) ──
const names = Object.keys(D);
const celda = (n, v) => `<figure style="margin:0;background:${v.fondo};display:grid;justify-items:center;padding:10px 10px 6px"><div style="width:100%;aspect-ratio:1">${svg(n, v).replace(/<\?xml[^>]*>\s*/, '').replace('width="800" height="800"', 'width="100%" height="100%"')}</div><figcaption style="font:500 12px 'Inter Tight',sans-serif;color:${v.tinta};letter-spacing:.02em;padding:4px 0">${n}</figcaption></figure>`;
const hoja = (variantes, cols) => `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500&display=swap"><body style="margin:0;background:${C.claro};padding:24px;width:1500px"><div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:16px">${names.map((n, i) => celda(n, variantes[i % variantes.length])).join('')}</div></body>`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1548, height: 1000 } });
for (const [file, vs, cols] of [['hoja-amarillo', [VARIANTES[1]], 3], ['hoja-mezcla', [VARIANTES[0], VARIANTES[2], VARIANTES[3]], 3]]) {
  await page.setContent(hoja(vs, cols), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(OUT, `${file}.png`), fullPage: true });
}
await browser.close();
console.log('Ilustraciones generadas en', OUT);
