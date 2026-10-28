/* Mooza · generador de carteles sobre la grilla de siete días.
   Uso:
     <link rel="stylesheet" href="styles.css">
     <script src="components/grid/poster.js"></script>
     MoozaPoster.mount(document.querySelector('#x'), 'semana', datos);   // datos opcional
   Formatos: 'semana' | 'foto' | 'grafico' | 'editorial' | 'story'.
   Los carteles se ven bien con cualquier margen (--mz-m) y medianil (--mz-g): ver tokens/grid.css. */
(function(root){
  'use strict';

  /* formatos: proporción (ancho/alto) y filas de la grilla. Siempre siete columnas.
     Las filas se eligen para que la celda quede casi cuadrada: alto de celda = (alto − 2 × margen − (filas − 1) × medianil) ÷ filas. */
  var FORMATOS={'4x5':{ar:'4/5',h:125},'1x1':{ar:'1/1',h:100},'a3':{ar:'297/420',h:141.4},'9x16':{ar:'9/16',h:177.8},'16x9':{ar:'16/9',h:56.25}};
  /* filas por diseño y formato. Los diseños no listados para un formato no existen en él. */
  var ROWS={
    semana:{'4x5':10,'a3':11,'1x1':8},
    foto:{'4x5':9,'a3':11,'1x1':8,'16x9':4},
    grafico:{'4x5':9,'a3':11,'1x1':8},
    editorial:{'4x5':9,'a3':11},
    story:{'9x16':16}
  };
  var CLASES={semana:'mz-semana',foto:'mz-foto',grafico:'mz-grafico',editorial:'mz-editorial',story:'mz-story mz-story-bg'};

  /* datos de ejemplo. s y e son horas decimales (20.5 = 20:30). p: precio tal como se escribe.
     f: destacado. Los eventos, salas y precios son inventados. */
  var EJEMPLO={
    rango:'26 oct – 1 nov',
    corto:'26–1',
    semana:[
      {d:'lun',n:26,e:[{t:'Poemas en voz alta',v:'Biblioteca del Sur',s:19,e:20.5,p:'Gratis'}]},
      {d:'mar',n:27,e:[{t:'Microteatro',v:'Sala Mapocho',s:20,e:21.5,p:'$4.000'}]},
      {d:'mié',n:28,e:[{t:'Cine en la plaza',v:'Plaza del Barrio',s:20.5,e:22.5,p:'Gratis'}]},
      {d:'jue',n:29,e:[{t:'Jazz de jueves',v:'Club Sur',s:21,e:23,p:'$5.000'}]},
      {d:'vie',n:30,e:[{t:'Paisajes de agua',v:'Galería Costanera',s:19,e:20.5,p:'Gratis'},{t:'Cuarteto de jazz en vivo',v:'Teatro del Parque',s:21,e:23,p:'desde $8.000',f:1}]},
      {d:'sáb',n:31,e:[{t:'Feria de grabado',v:'Galería Costanera',s:12,e:17,p:'Gratis'}]},
      {d:'dom',n:1,e:[{t:'Ensamble de cuerdas',v:'Parroquia del Cerro',s:12.5,e:14,p:'Gratis'}]}
    ],
    titularFoto:'tu semana<br>cultural',
    titularEditorial:'hay jazz,<br>teatro y cine<br>gratis, una<br>feria de<br>grabado.',
    cuadrados:[[1,2,1,1,'n'],[6,7,1,1,'k'],[1,2,-1,-1,'a'],[6,7,-1,-1,'k']],
    story:{categoria:'Música',titulo:'cuarteto de jazz<br>en vivo',meta:'Teatro del Parque<br>Viernes 30, 21:00 • desde $8.000',dia:4}
  };

  var LOGO='<svg class="mz-logo" viewBox="0 0 629.21 159.59" role="img" aria-label="Mooza"><use href="#mz-lockup"/></svg>';

  /* símbolo del logo (texto y ícono). Insértalo una vez por documento: MoozaPoster.sprite() */
  function sprite(){
    return '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs><symbol id="mz-lockup" viewBox="0 0 629.21 159.59"><g class="mz-lt"><path d="M180.62,102.9c0-7.2-.18-13.4-.44-19.04-.1-2.26,1.71-4.14,3.98-4.14h8.98c2.08,0,3.8,1.6,3.97,3.67l.61,7.78h.46c3.76-6.05,10.85-13.21,24.01-13.21,10.32,0,18.27,5.74,21.63,14.38h.32c2.73-4.27,6.01-7.53,9.53-9.79,4.44-2.98,9.35-4.58,15.85-4.58,12.89,0,26.02,8.83,26.02,33.83v41.89c0,2.21-1.79,4-4,4h-11.22c-2.21,0-4-1.79-4-4v-39.12c0-13-4.5-20.62-13.91-20.62-6.74,0-11.68,4.75-13.71,10.38-.63,1.88-1,4.37-1,6.58v42.78c0,2.21-1.79,4-4,4h-11.22c-2.21,0-4-1.79-4-4v-41.07c0-10.98-4.39-18.66-13.45-18.66-7.39,0-12.33,5.79-14.18,11.13-.7,1.98-.98,4.31-.98,6.52v42.08c0,2.21-1.79,4-4,4h-11.22c-2.21,0-4-1.79-4-4v-50.77Z"/><path d="M390.48,117.93c0,28.65-20.11,41.5-40.05,41.5-21.99,0-39.01-15.18-39.01-40.16s16.84-41.32,40.34-41.32,38.72,16.34,38.72,39.98ZM331.68,118.78c0,15,7.49,26.34,19.38,26.34s19.15-10.91,19.15-26.6c0-12.25-5.42-26.24-19.02-26.24s-19.51,13.5-19.51,26.5Z"/><path d="M481.12,117.93c0,28.65-20.11,41.5-40.05,41.5-21.99,0-39.01-15.18-39.01-40.16s16.84-41.32,40.34-41.32,38.72,16.34,38.72,39.98ZM422.32,118.78c0,15,7.49,26.34,19.38,26.34s19.15-10.91,19.15-26.6c0-12.25-5.42-26.24-19.02-26.24s-19.51,13.5-19.51,26.5Z"/><path d="M488.69,147.67c0-.89.3-1.76.85-2.47l28.49-36.37c4.01-4.81,7.34-8.63,11.41-13.07v-.34h-33.84c-2.21,0-4-1.79-4-4v-7.69c0-2.21,1.79-4,4-4h53.87c2.22,0,4.01,1.8,4,4.02l-.03,6.63c0,.89-.3,1.75-.85,2.45l-27.73,35.5c-3.84,4.67-7.51,9.16-11.51,13.32v.34h37.06c2.21,0,4,1.79,4,4v7.69c0,2.21-1.79,4-4,4h-57.72c-2.21,0-4-1.79-4-4v-6Z"/><path d="M615.44,157.68c-1.97,0-3.65-1.44-3.96-3.39l-.82-5.29h-.47c-4.73,6.15-12.88,10.45-22.97,10.45-15.82,0-24.58-11.3-24.58-23.19,0-19.67,17.53-29.63,46.24-29.51v-1.29c0-5.12-2.03-13.64-15.83-13.59-5.85,0-11.92,1.44-16.83,3.63-2.24,1-4.83-.1-5.54-2.44l-1.53-5.01c-.58-1.9.29-3.94,2.09-4.8,6.04-2.9,14.85-5.28,25.21-5.28,25,0,32.14,15.77,32.14,32.87v28.07c0,5.14.19,10.16.62,14.38.24,2.37-1.59,4.4-3.97,4.4h-9.79ZM609.4,119.5c-13.91-.19-27.21,2.75-27.21,14.62,0,7.63,5.01,11.23,11.24,11.23,7.87,0,13.54-5.08,15.42-10.79.42-1.37.55-2.92.55-4.28v-10.77Z"/></g><path class="mz-li" d="M152.67,5.56c-9.81-7.28-23.19-7.42-33.14-.33h0c-12.5,8.9-15.89,26.01-7.73,39.01l13.66,21.74c.44.7.43,1.6-.02,2.29l-8.68,13.25c-.84,1.28-2.73,1.28-3.56,0l-40.65-62.78C59.87-.87,33.03-5.22,14.8,9.36h0C-1.04,22.04-4.68,44.68,6.39,61.68l59.33,91.11c5.93,9.11,19.28,9.06,25.15-.09l69.02-107.64c8.35-13.02,5.19-30.28-7.23-39.51ZM80.18,145.84c-.44.69-1.09,1.04-1.91,1.04s-1.45-.35-1.9-1.03L17.04,54.75c-7.54-11.58-5.09-26.83,5.7-35.46,4.79-3.84,10.55-5.86,16.66-5.86,9.13,0,17.54,4.56,22.48,12.21l40.65,62.78c2.34,3.61,6.06,5.98,10.23,6.61l-32.59,50.82ZM149.2,38.2l-13.22,20.62-13.41-21.35c-4.58-7.29-2.67-16.91,4.34-21.9,2.63-1.88,5.74-2.87,8.97-2.87s6.54,1.05,9.22,3.05c7.03,5.22,8.83,15.08,4.1,22.44Z"/></symbol><symbol id="mz-iso" viewBox="0 0 168.34 163.27"><path class="mz-li" d="M156.19,5.68c-10.03-7.45-23.72-7.59-33.9-.34h0c-12.79,9.11-16.26,26.61-7.91,39.91l13.97,22.24c.45.72.44,1.64-.02,2.35l-8.88,13.56c-.86,1.31-2.79,1.31-3.64,0L74.22,19.16C61.25-.89,33.79-5.34,15.15,9.58h0C-1.07,22.55-4.79,45.71,6.54,63.11l60.7,93.2c6.07,9.32,19.73,9.27,25.73-.09l70.61-110.12c8.54-13.32,5.31-30.98-7.39-40.42ZM82.03,149.2c-.45.71-1.11,1.07-1.95,1.07s-1.49-.35-1.94-1.05L17.43,56.01c-7.72-11.85-5.21-27.45,5.83-36.28,4.9-3.92,10.8-6,17.04-6,9.34,0,17.94,4.67,23,12.49l41.58,64.23c2.39,3.69,6.2,6.12,10.47,6.76l-33.34,51.99ZM152.64,39.08l-13.53,21.1-13.72-21.84c-4.68-7.46-2.73-17.3,4.44-22.41,2.69-1.92,5.87-2.93,9.18-2.93s6.69,1.08,9.44,3.12c7.19,5.34,9.03,15.42,4.2,22.96Z"/></symbol></defs></svg>';
  }

  function cell(c1,c2,r1,r2,cls,html,st){
    return '<div class="'+(cls||'')+'" style="grid-column:'+c1+'/'+(c2+1)+';grid-row:'+r1+'/'+(r2+1)+';'+(st||'')+'">'+(html||'')+'</div>';
  }
  function overlay(rows){return '<div class="mz-overlay" style="--rows:'+rows+'">'+new Array(7*rows+1).join('<i></i>')+'</div>'}
  function grid(rows,inner){return '<div class="mz-grid" style="--rows:'+rows+'">'+inner+'</div>'+overlay(rows)}

  /* pie: la última fila de todo cartel. El logo mide dos columnas y va a la izquierda; la fecha, a la derecha.
     Nada más entra en esa fila, así que el logo nunca choca. */
  function pie(n,fecha,desde){
    return cell(1,2,n,n,'mz-pie-logo',LOGO)+(fecha?cell(desde||5,7,n,n,'mz-dato mz-fecha-pie',fecha):'');
  }

  /* semana: cada celda es un día (columna) y una franja horaria (fila 2 a n−1); fila 1 los días */
  var PRIO={y:3,w:2,n:1};
  /* franja: fila (2 a n−1) de una hora, repartiendo las 12 horas entre las 12:00 y las 24:00 en las filas disponibles */
  function franja(s,n){n=n||10;var slots=n-2,k=Math.floor((s-12)/(12/slots));return 2+Math.max(0,Math.min(slots-1,k))}
  function semana(d,n){
    var h='',F={};
    'LMMJVSD'.split('').forEach(function(l,i){h+=cell(i+1,i+1,1,1,'mz-dia',l)});
    d.semana.forEach(function(dia,i){dia.e.forEach(function(e){
      var k=e.f?'y':(/gratis/i.test(e.p)?'w':'n'),key=(i+1)+'-'+franja(e.s,n);
      if(!F[key]||PRIO[k]>PRIO[F[key]])F[key]=k;
    })});
    for(var r=2;r<=n-1;r++)for(var c=1;c<=7;c++){var k=F[c+'-'+r];h+=cell(c,c,r,r,'mz-tile'+(k?' mz-f-'+k:''))}
    return grid(n,h+pie(n,d.rango));
  }

  /* foto: una foto en celdas completas arriba y el titular serif en tres filas debajo */
  function foto(d,n){
    if(n===4)return grid(4, /* horizontal 16:9: titular a la izquierda, foto a la derecha */
      cell(5,7,1,3,'mz-ph','foto del evento')+
      cell(1,4,1,3,'mz-titular',d.titularFoto,'font-size:calc(var(--mz-fs-titular)*.62)')+pie(4,d.rango));
    return grid(n,
      cell(3,7,1,n-4,'mz-ph','foto del evento')+
      cell(1,7,n-3,n-1,'mz-titular',d.titularFoto,n===8?'font-size:calc(var(--mz-fs-titular)*.82)':(n===11?'font-size:calc(var(--mz-fs-titular)*.92)':''))+pie(n,d.rango));
  }

  /* gráfico: número grande arriba a la izquierda y la semana como horario. Escala de 10:00 a 24:00; el alto del bloque es la duración */
  function grafico(d,n){
    var cols='';
    d.semana.forEach(function(dia,i){
      cols+=cell(i+1,i+1,3,n-1,'mz-col',dia.e.map(function(e){
        var t=(e.s-10)/14*100,hh=(e.e-e.s)/14*100;
        return '<i class="'+(e.f?'mz-w':'')+'" style="top:'+t.toFixed(2)+'%;height:'+hh.toFixed(2)+'%"></i>';
      }).join(''));
    });
    return grid(n,cell(1,7,1,2,'mz-numero',d.corto)+cols+pie(n,d.rango));
  }

  /* editorial: titular escrito con lo que pasa y cuadrados donde irían las fotos.
     Los cuadrados van en la fila 1 y en la fila previa al pie (−1), fuera de las filas del titular (3 a n−2).
     Las filas pueden ser números, negativos (desde el pie) o 'c' y 'c+1' (centro del titular). */
  function editorial(d,n){
    var c=Math.floor((3+n-2)/2);
    function fila(v){return v==='c'?c:v==='c+1'?c+1:(v<0?n+v:v)}
    var sq=d.cuadrados.map(function(s){return cell(s[0],s[1],fila(s[2]),fila(s[3]),'mz-sq mz-s-'+s[4])}).join('');
    return grid(n,sq+cell(1,7,3,n-2,'mz-titular-largo',d.titularEditorial)+pie(n,'mooza.cl'));
  }

  /* story 9:16: 16 filas, margen vertical 2,2 veces el margen */
  function story(d){
    var s=d.story,dots='';
    for(var r=1;r<=2;r++)for(var c=1;c<=7;c++)dots+=cell(c,c,r,r,'mz-punto'+(r===2&&c===s.dia+1?' mz-on':''),'<b></b>');
    return grid(16,dots+
      cell(1,7,4,4,'mz-etiqueta','<i></i>'+s.categoria)+
      cell(1,7,5,7,'mz-titular-story',s.titulo)+
      cell(1,5,8,8,'mz-meta',s.meta)+
      cell(1,7,10,14,'mz-ph','foto del evento')+
      pie(16,null));
  }

  var BUILD={semana:semana,foto:foto,grafico:grafico,editorial:editorial,story:story};

  function merge(d){var o={};for(var k in EJEMPLO)o[k]=EJEMPLO[k];for(var j in (d||{}))o[j]=d[j];return o}
  function formatoDe(tipo,formato){return formato||(tipo==='story'?'9x16':'4x5')}
  function filas(tipo,formato){
    var n=ROWS[tipo]&&ROWS[tipo][formatoDe(tipo,formato)];
    if(!n)throw new Error('El diseño "'+tipo+'" no existe en el formato '+formatoDe(tipo,formato));
    return n;
  }
  /* html: diseño, datos y formato ('4x5' por defecto; 'a3', '1x1' y '16x9' donde existan; 9x16 para story) */
  function html(tipo,datos,formato){
    if(!BUILD[tipo])throw new Error('Diseño desconocido: '+tipo);
    return BUILD[tipo](merge(datos),filas(tipo,formato));
  }
  /* mount: pone el cartel dentro de un elemento. Agrega .mz-poster, la clase del diseño y la proporción. */
  function mount(el,tipo,datos,formato){
    var f=formatoDe(tipo,formato);
    el.className=(el.className?el.className+' ':'')+'mz-poster '+CLASES[tipo];
    el.style.setProperty('--mz-ar',FORMATOS[f].ar);
    el.innerHTML=html(tipo,datos,f);
    return el;
  }

  var api={FORMATOS:FORMATOS,ROWS:ROWS,EJEMPLO:EJEMPLO,sprite:sprite,html:html,mount:mount,franja:franja};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.MoozaPoster=api;
})(typeof window!=='undefined'?window:globalThis);
