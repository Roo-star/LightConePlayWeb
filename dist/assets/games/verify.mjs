import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source=fs.readFileSync(new URL('../../games-showcase.js',import.meta.url),'utf8').replace(/^export /gm,'');
const ctx=vm.createContext({matchMedia:()=>({matches:false})});vm.runInContext(source,ctx);
const html=vm.runInContext('gamesShowcaseHTML()',ctx);let checks=0;
function check(value,message){assert.ok(value,message);checks++}
check(html.includes('Black Pulse')&&html.includes('Paradox Mansion'),'Both real projects render');
check((html.match(/class="gs-image-button"/g)||[]).length===18,'18 local original image slots');
check(!html.includes('undefined'),'No unresolved markup values');
const ids=[...html.matchAll(/ id="([^"]+)"/g)].map(m=>m[1]);check(new Set(ids).size===ids.length,'Unique component IDs');
check(html.includes('data-gs-video="SvDb3p0VVvA"')&&html.includes('data-gs-video="UTdfq8nzmrI"'),'Both verified official video IDs');
check(html.includes('Zhao Yingru')&&html.includes('Du Yu')&&html.includes('Zhu Free'),'Original VR creators credited');
const imagePaths=[...new Set([...html.matchAll(/(?:src|data-gs-image)="(assets\/games\/[^"]+)"/g)].map(m=>m[1]))];
check(imagePaths.length===18,'All 18 photographs and documents have distinct local assets');
check(imagePaths.every(path=>{const p=new URL('../../'+path,import.meta.url);return fs.existsSync(p)&&fs.readFileSync(p)[0]===255}),'Every referenced image exists with JPEG signature');
check(html.indexOf('paradox-cover.jpg')<html.indexOf('paradox-mechanics-sheet.jpg'),'Actual cover precedes development sheet');
check(html.includes('<details class="gs-development">'),'Design material separated behind an optional disclosure');
class El{
 constructor(){this.handlers={};this.classList={add:()=>{}};this.dataset={};this.hidden=false;this.complete=false;this.naturalWidth=0;this.open=false;this.focused=false;this.scrolled=false;}
 addEventListener(k,v){this.handlers[k]=v}removeEventListener(k,v){if(this.handlers[k]===v)delete this.handlers[k]}
 removeAttribute(k){delete this[k]}focus(){this.focused=true}showModal(){this.open=true}close(){this.open=false;this.handlers.close?.()}
 scrollIntoView(){this.scrolled=true}remove(){this.removed=true}
}
const image=new El(),caption=new El(),link=new El(),dialog=new El(),section=new El(),collection=new El(),iframe=new El();
dialog.querySelector=s=>({img:image,p:caption,a:link})[s];collection.querySelector=s=>s==='.gs-lightbox'?dialog:section;
const openers=Array.from({length:18},(_,i)=>{const e=new El();e.dataset={gsImage:imagePaths[i],gsCaption:'Image '+i};return e});
const pictures=Array.from({length:18},()=>{const e=new El();e.closest=()=>new El();return e});
collection.querySelectorAll=s=>s==='[data-gs-image]'?openers:s==='.gs-video iframe'?[iframe]:pictures;
ctx.host={querySelector:()=>collection};ctx.document={createElement:()=>iframe};
const dispose=vm.runInContext('mountGamesShowcase(host)',ctx);check(typeof dispose==='function','Mount returns cleanup');
function target(selector,el){return {closest:s=>s===selector?el:null}}
collection.handlers.click({target:target('[data-gs-image]',openers[0])});
check(dialog.open&&image.src===imagePaths[0]&&caption.textContent.includes('1 / 18'),'Image viewer opens selected original and count');
collection.handlers.click({target:target('.gs-lightbox-next',new El())});
check(image.src===imagePaths[1],'Next image control works');
let prevented=false;dialog.handlers.keydown({key:'ArrowLeft',preventDefault(){prevented=true}});
check(image.src===imagePaths[0]&&prevented,'Keyboard previous image works');
dialog.handlers.keydown({key:'ArrowLeft',preventDefault(){}});
check(image.src===imagePaths[17],'Gallery wraps to last image');
dialog.close();check(openers[0].focused&&!image.src,'Closing releases image and restores focus');
prevented=false;collection.handlers.click({target:target('[data-gs-scroll]',{dataset:{gsScroll:'black-pulse'}}),preventDefault(){prevented=true}});
check(prevented&&section.scrolled,'Case-study index scrolls without changing route');
const watch=new El();watch.dataset={gsVideo:'SvDb3p0VVvA',gsVideoTitle:'Official gameplay'};watch.parentElement={replaceChildren:f=>{watch.loaded=f}};
collection.handlers.click({target:target('[data-gs-video]',watch)});
check(watch.loaded===iframe&&iframe.src.startsWith('https://www.youtube-nocookie.com/embed/SvDb3p0VVvA'),'Video loads only after explicit play');
check(iframe.allowFullscreen&&iframe.title==='Official gameplay','Video has accessible title and fullscreen');
pictures[0].handlers.error();check(pictures[0].hidden,'Image failure fallback hides broken icon');
dispose();check(!collection.handlers.click&&!dialog.handlers.close&&!dialog.handlers.keydown&&pictures.every(p=>!p.handlers.load&&!p.handlers.error),'Cleanup removes listeners');
check(iframe.removed,'Route cleanup stops embedded video');
const css=fs.readFileSync(new URL('../../games-showcase.css',import.meta.url),'utf8');check(css.includes('.gs-collection .gs-titlebar{position:static'),'Global sticky header scoped out');check(css.includes('.gs-collection .gs-index{position:static'),'Mobile global navigation scoped out');
const result={checks,passed:true,localImages:18,verifiedVideoIds:['SvDb3p0VVvA','UTdfq8nzmrI'],browserVisualQA:'Pending whole-site review',videoPlayback:'Embeds use IDs in original portfolio pages; live playback not tested',totalImageBytes:imagePaths.reduce((n,p)=>n+fs.statSync(new URL('../../'+p,import.meta.url)).size,0)};
fs.writeFileSync(new URL('./verification.json',import.meta.url),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));

