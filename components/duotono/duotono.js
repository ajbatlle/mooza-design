/* Mooza · fotos en tinta azul con transparencia (el modo de mostrar fotografías) y duotono con los colores de la marca.
   TINTA: la foto se vuelve una imagen de un solo color, azul, cuyo canal alfa sale de la luminancia: las sombras quedan opacas
   y las luces transparentes. Se apoya sobre una zona lisa amarilla o naranja, que asoma por las luces.
   Uso en CSS:    document.body.insertAdjacentHTML('afterbegin', MoozaDuotono.filtroTinta());  y luego  <img style="filter:url(#mz-tinta)">
   Uso en canvas: MoozaDuotono.aplicarTinta(imagenOCanvas, canvasDestino, { contraste: 1.2, gamma: 1 });  (el PNG que sale conserva la transparencia)

   Procedimiento: 1) escala de grises por luminancia, 2) niveles (punto negro y blanco por percentiles, gamma y contraste),
   3) mapa de degradado de dos colores: las sombras toman el color oscuro y las luces el claro.
   Uso en CSS:   document.body.insertAdjacentHTML('afterbegin', MoozaDuotono.filtros());  y luego  <img style="filter:url(#mz-duo-azul-amarillo)">
   Uso en canvas: MoozaDuotono.aplicar(imagenOCanvas, canvasDestino, 'azul-amarillo', { contraste: 1, gamma: 1, grano: .03 });
   También funciona en Node para pruebas: MoozaDuotono.mapear(imageData, 'azul-naranja', opciones). */
(function(root){
  'use strict';

  /* sombra → luz. Todos son colores de la paleta (tokens/colors.css). */
  var PALETAS={
    'azul-amarillo': ['#1b1444','#fcee21'],
    'azul-naranja':  ['#1b1444','#fbb03b'],
    'azul-claro':    ['#1b1444','#f2f2f2']
  };

  function rgb(h){return [1,3,5].map(function(i){return parseInt(h.slice(i,i+2),16)})}
  function curva(t,c){ /* contraste: 1 = lineal, >1 = curva en S */
    if(c===1)return t;
    var s=t*t*(3-2*t); return t+(s-t)*Math.min(1,(c-1));
  }
  function tabla(paleta,contraste){
    var a=rgb(PALETAS[paleta][0]),b=rgb(PALETAS[paleta][1]),n=9,R=[],G=[],B=[];
    for(var i=0;i<n;i++){var t=curva(i/(n-1),contraste||1);R.push((a[0]+(b[0]-a[0])*t)/255);G.push((a[1]+(b[1]-a[1])*t)/255);B.push((a[2]+(b[2]-a[2])*t)/255)}
    return {R:R.map(function(v){return v.toFixed(4)}).join(' '),G:G.map(function(v){return v.toFixed(4)}).join(' '),B:B.map(function(v){return v.toFixed(4)}).join(' ')};
  }

  /* filtros SVG para usar con CSS: filter:url(#mz-duo-<paleta>) */
  function filtros(contraste){
    var f=Object.keys(PALETAS).map(function(k){
      var t=tabla(k,contraste||1.15);
      return '<filter id="mz-duo-'+k+'" color-interpolation-filters="sRGB">'+
        '<feColorMatrix type="matrix" values="0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0"/>'+
        '<feComponentTransfer><feFuncR type="table" tableValues="'+t.R+'"/><feFuncG type="table" tableValues="'+t.G+'"/><feFuncB type="table" tableValues="'+t.B+'"/></feComponentTransfer></filter>';
    }).join('');
    return '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>'+f+'</defs></svg>';
  }

  var AZUL='#1b1444';

  /* filtro SVG con el mismo efecto, para ver una foto cualquiera en tinta azul sin procesarla: filter:url(#mz-tinta) */
  function filtroTinta(){
    var a=rgb(AZUL).map(function(v){return (v/255).toFixed(4)});
    return '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs><filter id="mz-tinta" color-interpolation-filters="sRGB">'+
      '<feColorMatrix type="matrix" values="0 0 0 0 '+a[0]+'  0 0 0 0 '+a[1]+'  0 0 0 0 '+a[2]+'  -0.2126 -0.7152 -0.0722 0 1"/>'+
      '<feComponentTransfer><feFuncA type="table" tableValues="0 0 .06 .22 .5 .78 .94 1 1"/></feComponentTransfer></filter></defs></svg>';
  }

  /* tinta azul con transparencia sobre un ImageData, in situ. Opciones: contraste (1), gamma (1), negro/blanco (percentiles, 1 y 99), grano (0 a .1) */
  function mapearTinta(img,o){
    o=o||{};
    var d=img.data,n=d.length/4,c=rgb(AZUL),L=new Float32Array(n),hist=new Uint32Array(256),i,y;
    for(i=0;i<n;i++){y=.2126*d[4*i]+.7152*d[4*i+1]+.0722*d[4*i+2];L[i]=y;hist[Math.min(255,Math.round(y))]++}
    function pct(p){var acc=0,lim=n*p/100;for(var k=0;k<256;k++){acc+=hist[k];if(acc>=lim)return k}return 255}
    var lo=pct(o.negro!=null?o.negro:1),hi=pct(o.blanco!=null?o.blanco:99);if(hi<=lo){lo=0;hi=255}
    var gamma=o.gamma||1,contraste=o.contraste||1,grano=o.grano||0;
    for(i=0;i<n;i++){
      var t=(L[i]-lo)/(hi-lo);t=t<0?0:t>1?1:t;
      t=Math.pow(t,1/gamma);t=curva(t,contraste);
      if(grano){t+=(Math.random()-.5)*grano;t=t<0?0:t>1?1:t}
      d[4*i]=c[0];d[4*i+1]=c[1];d[4*i+2]=c[2];d[4*i+3]=Math.round(255*(1-t));
    }
    return img;
  }

  function aplicarTinta(origen,destino,o){
    o=o||{};
    var w=origen.naturalWidth||origen.width,h=origen.naturalHeight||origen.height,k=o.lado?Math.min(1,o.lado/Math.max(w,h)):1;
    destino.width=Math.round(w*k);destino.height=Math.round(h*k);
    var c=destino.getContext('2d');c.clearRect(0,0,destino.width,destino.height);c.drawImage(origen,0,0,destino.width,destino.height);
    var im=c.getImageData(0,0,destino.width,destino.height);mapearTinta(im,o);c.putImageData(im,0,0);
    return destino;
  }

  /* mapea un ImageData (o {data,width,height}) in situ. Opciones: contraste (1), gamma (1), grano (0 a .1), negro/blanco (percentiles, 1 y 99) */
  function mapear(img,paleta,o){
    o=o||{};
    var d=img.data,n=d.length/4,a=rgb(PALETAS[paleta][0]),b=rgb(PALETAS[paleta][1]);
    var L=new Float32Array(n),hist=new Uint32Array(256),i,y;
    for(i=0;i<n;i++){y=.2126*d[4*i]+.7152*d[4*i+1]+.0722*d[4*i+2];L[i]=y;hist[Math.min(255,Math.round(y))]++}
    function pct(p){var acc=0,lim=n*p/100;for(var k=0;k<256;k++){acc+=hist[k];if(acc>=lim)return k}return 255}
    var lo=pct(o.negro!=null?o.negro:1),hi=pct(o.blanco!=null?o.blanco:99);if(hi<=lo){lo=0;hi=255}
    var gamma=o.gamma||1,contraste=o.contraste||1,grano=o.grano||0;
    for(i=0;i<n;i++){
      var t=(L[i]-lo)/(hi-lo);t=t<0?0:t>1?1:t;
      t=Math.pow(t,1/gamma);t=curva(t,contraste);
      if(grano){t+=(Math.random()-.5)*grano;t=t<0?0:t>1?1:t}
      d[4*i]=a[0]+(b[0]-a[0])*t;d[4*i+1]=a[1]+(b[1]-a[1])*t;d[4*i+2]=a[2]+(b[2]-a[2])*t;d[4*i+3]=255;
    }
    return img;
  }

  /* dibuja origen (img o canvas) en destino (canvas) y le aplica el duotono. Lado máximo opcional. */
  function aplicar(origen,destino,paleta,o){
    o=o||{};
    var w=origen.naturalWidth||origen.width,h=origen.naturalHeight||origen.height,k=o.lado?Math.min(1,o.lado/Math.max(w,h)):1;
    destino.width=Math.round(w*k);destino.height=Math.round(h*k);
    var c=destino.getContext('2d');c.drawImage(origen,0,0,destino.width,destino.height);
    var im=c.getImageData(0,0,destino.width,destino.height);mapear(im,paleta,o);c.putImageData(im,0,0);
    return destino;
  }

  var api={PALETAS:PALETAS,AZUL:AZUL,filtros:filtros,filtroTinta:filtroTinta,mapear:mapear,aplicar:aplicar,mapearTinta:mapearTinta,aplicarTinta:aplicarTinta};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.MoozaDuotono=api;
})(typeof window!=='undefined'?window:globalThis);
