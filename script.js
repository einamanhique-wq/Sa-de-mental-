const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
// Menu móvel
const menuBtn=$('#menuBtn'),nav=$('#nav');
menuBtn.addEventListener('click',()=>{const o=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',o)});
$$('#nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn.setAttribute('aria-expanded',false)}));
// Barra de progresso
addEventListener('scroll',()=>{const h=document.documentElement;$('#progress').style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%'},{passive:true});
// Aparecer ao rolar
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');io.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach(el=>io.observe(el));
// Contadores
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const n=+e.target.dataset.n;let c=0;const t=setInterval(()=>{c+=Math.max(1,Math.ceil(n/40));if(c>=n){c=n;clearInterval(t)}e.target.textContent=c},30);cio.unobserve(e.target)}),{threshold:.6});
$$('[data-n]').forEach(b=>cio.observe(b));
// Cartões mito/verdade
$$('.flip').forEach(f=>f.addEventListener('click',()=>f.classList.toggle('on')));
// Sinais
const boxes=$$('#signs input'),res=$('#signsResult');
boxes.forEach(b=>b.addEventListener('change',()=>{
  const n=[...boxes].filter(x=>x.checked).length;
  res.textContent=n===0?'Nenhum sinal marcado.':n<=2?n+' sinal(is) marcado(s). Cuide do descanso e converse com alguém de confiança.':n+' sinais marcados. Fale com um professor, encarregado de educação ou profissional de saúde.';
}));
// Respiração
const circle=$('#circle'),txt=$('#breathText'),btn=$('#breathBtn');let running=false;
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function breathe(){
  if(running)return;running=true;btn.disabled=true;
  for(let i=1;i<=5;i++){
    circle.className='circle in';txt.textContent='Inspire… ('+i+'/5)';await wait(4000);
    circle.className='circle hold';txt.textContent='Segure…';await wait(4000);
    circle.className='circle out';txt.textContent='Expire devagar…';await wait(6000);
  }
  circle.className='circle';txt.textContent='Muito bem! Como se sente?';running=false;btn.disabled=false;
}
btn.addEventListener('click',breathe);circle.addEventListener('click',breathe);
circle.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();breathe()}});
