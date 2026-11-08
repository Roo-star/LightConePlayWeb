const fs=require('fs');const p='LightCone-Play-Site/cubiverse/index.html';let s=fs.readFileSync(p,'utf8');
if(!s.includes('http-equiv="Content-Type"'))s=s.replace('<meta charset="UTF-8" />','<meta charset="UTF-8" />\n  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />');
if(!s.includes('encoding-hardening.css'))s=s.replace('</head>','  <link rel="stylesheet" href="./encoding-hardening.css">\n</head>');
const paths={
'settings-open':'<circle cx="12" cy="12" r="3"/><path d="M10 2h4l1 4 4 1 2 4-3 3v4l-4 3-3-3-4 1-3-4 2-3-1-4 4-2z"/>',
'fullscreen':'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',
'camera-iso':'<path d="m12 3 9 5v9l-9 5-9-5V8zM3 8l9 5 9-5M12 13v9"/>',
'camera-top':'<path d="M12 3v14m-5-5 5 5 5-5M4 21h16"/>',
'camera-front':'<rect x="4" y="4" width="16" height="16"/>',
'camera-side':'<path d="m5 5 14-3v17L5 22z"/>',
'camera-reset':'<path d="M4 10a8 8 0 1 1 1 8M4 4v6h6"/>'};
for(const [id,body] of Object.entries(paths)){const re=new RegExp('(<button[^>]*id="'+id+'"[^>]*>)[\\s\\S]*?(</button>)');s=s.replace(re,(_,a,b)=>a+'<svg viewBox="0 0 24 24" aria-hidden="true">'+body+'</svg>'+b)}
s=s.replace(/[^\x00-\x7F]/gu,c=>'&#'+c.codePointAt(0)+';');fs.writeFileSync(p,s,'utf8');console.log('Cubiverse HTML is ASCII safe; UTF-8 declaration and SVG toolbar icons installed.');
