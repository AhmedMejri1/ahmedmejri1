// Fetches public repos client-side (no token needed). Falls back to a profile link.
(async function(){
const el=document.getElementById('repos');if(!el)return;
const fallback='<p class="note">Repositories could not be loaded right now. Use the profile buttons below.</p>';
try{
const r=await fetch('https://api.github.com/users/AhmedMejri1/repos?sort=pushed&per_page=30');
if(!r.ok)throw 0;
const repos=(await r.json()).filter(x=>!x.fork).slice(0,6);
if(!repos.length){el.innerHTML='<p class="note">No public original repositories to show yet.</p>';return}
el.innerHTML='';
repos.forEach(x=>{const c=document.createElement('article');c.className='card';
const h=document.createElement('h3');h.textContent=x.name;
const p=document.createElement('p');p.textContent=x.description||'Public repository';
const m=document.createElement('div');m.className='meta mono';m.textContent=[x.language,'Updated '+x.pushed_at.slice(0,10)].filter(Boolean).join(' · ');
const a=document.createElement('a');a.className='btn';a.href=x.html_url;a.target='_blank';a.rel='noopener';a.textContent='View Repository';
c.append(h,p,m,a);el.append(c)});
}catch(e){el.innerHTML=fallback}
})();
