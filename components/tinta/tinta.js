/* Mooza · fotos en tinta azul con transparencia, el único modo de mostrar fotografías.
   La foto se vuelve una imagen de un solo color, azul, cuyo canal alfa es 255 menos el canal verde de la foto: las sombras quedan opacas
   y las luces transparentes (en Photoshop: relleno sólido azul con máscara = canal verde invertido). Se apoya sobre una zona lisa amarilla o naranja, que asoma por las luces.
   Uso en CSS:    document.body.insertAdjacentHTML('afterbegin', MoozaTinta.filtroTinta());  y luego  <img style="filter:url(#mz-tinta)">
   Uso en canvas: MoozaTinta.aplicarTinta(imagenOCanvas, canvasDestino, {});  (el PNG que sale conserva la transparencia) */
(function(root){
  'use strict';

  var AZUL='#1b1444';
  function rgb(h){return [1,3,5].map(function(i){return parseInt(h.slice(i,i+2),16)})}
  function curva(t,c){ /* contraste: 1 = lineal, >1 = curva en S */
    if(c===1)return t;
    var s=t*t*(3-2*t); return t+(s-t)*Math.min(1,(c-1));
  }

  /* filtro SVG con el mismo efecto, para ver una foto cualquiera en tinta azul sin procesarla: filter:url(#mz-tinta).
     Es el procedimiento de Mooza: relleno sólido azul con máscara = canal verde de la foto, invertido. */
  function filtroTinta(){
    var a=rgb(AZUL).map(function(v){return (v/255).toFixed(4)});
    return '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs><filter id="mz-tinta" color-interpolation-filters="sRGB">'+
      '<feColorMatrix type="matrix" values="0 0 0 0 '+a[0]+'  0 0 0 0 '+a[1]+'  0 0 0 0 '+a[2]+'  0 -1 0 0 1"/></filter></defs></svg>';
  }

  /* tinta azul con transparencia sobre un ImageData, in situ. Es el procedimiento de Mooza: el alfa es 255 menos el canal verde,
     y el color es siempre el azul. Sin opciones el resultado es idéntico al de la máscara de la capa de relleno.
     Opciones (todas apagadas por defecto): contraste (1), gamma (1), niveles: true para estirar negro y blanco por percentiles (negro 1, blanco 99), grano (0 a .1) */
  function mapearTinta(img,o){
    o=o||{};
    var d=img.data,n=d.length/4,c=rgb(AZUL),i,t;
    var lo=0,hi=255;
    if(o.niveles){
      var hist=new Uint32Array(256);for(i=0;i<n;i++)hist[d[4*i+1]]++;
      var pct=function(p){var acc=0,lim=n*p/100;for(var k=0;k<256;k++){acc+=hist[k];if(acc>=lim)return k}return 255};
      lo=pct(o.negro!=null?o.negro:1);hi=pct(o.blanco!=null?o.blanco:99);if(hi<=lo){lo=0;hi=255}
    }
    var gamma=o.gamma||1,contraste=o.contraste||1,grano=o.grano||0,ajusta=o.niveles||gamma!==1||contraste!==1||grano;
    for(i=0;i<n;i++){
      var v=d[4*i+1];
      if(ajusta){
        t=(v-lo)/(hi-lo);t=t<0?0:t>1?1:t;
        t=Math.pow(t,1/gamma);t=curva(t,contraste);
        if(grano){t+=(Math.random()-.5)*grano;t=t<0?0:t>1?1:t}
        v=Math.round(255*t);
      }
      d[4*i]=c[0];d[4*i+1]=c[1];d[4*i+2]=c[2];d[4*i+3]=255-v;
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

  var api={AZUL:AZUL,filtroTinta:filtroTinta,mapearTinta:mapearTinta,aplicarTinta:aplicarTinta};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.MoozaTinta=api;
})(typeof window!=='undefined'?window:globalThis);
