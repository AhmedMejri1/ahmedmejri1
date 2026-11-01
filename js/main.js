const $=s=>document.querySelector(s);
const mk=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;return e};
const link=(txt,href)=>{const a=mk('a','btn',txt);a.href=href;if(/^https?:/.test(href)){a.target='_blank';a.rel='noopener'}return a};
// theme + menu
const root=document.documentElement;
$('#theme').onclick=()=>{const t=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=t;try{localStorage.setItem('theme',t)}catch(e){}};
const burger=$('#burger'),menu=$('#menu');
burger.onclick=()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)};
menu.querySelectorAll('a').forEach(a=>a.onclick=()=>{menu.classList.remove('open');burger.setAttribute('aria-expanded',false)});
$('#yr').textContent=new Date().getFullYear();
// skills
let skillFilter=null;
SKILLS.forEach(([t,l])=>{const c=mk('article','card skill');c.append(mk('h3','',t));const u=mk('ul');l.forEach(i=>u.append(mk('li','',i)));c.append(u);$('#skills').append(c)});
// projects + filters
function renderProjects(f){const g=$('#pgrid');g.innerHTML='';
PROJECTS.filter(p=>f==='All'||p.cat===f).forEach(p=>{
const c=mk('article','card'+(p.star?' star':''));
c.append(mk('div','meta mono',p.year+' · '+p.cat),mk('h3','',p.title),mk('p','',p.desc));
const t=mk('ul','tags');p.tech.forEach(x=>t.append(mk('li','',x)));c.append(t);
const a=mk('p');a.innerHTML='<b>Contribution:</b> ';a.append(p.contrib);const o=mk('p');o.innerHTML='<b>Outcome:</b> ';o.append(p.outcome);c.append(a,o);
const l=mk('div','links');p.links.forEach(([x,h],i)=>{const b=link(x,h);if(i===0)b.classList.add('primary');l.append(b)});c.append(l);g.append(c)})}
const cats=['All',...new Set(PROJECTS.map(p=>p.cat))];
cats.forEach((c,i)=>{const b=mk('button','',c);b.setAttribute('aria-pressed',i===0);b.onclick=()=>{document.querySelectorAll('#filters button').forEach(x=>x.setAttribute('aria-pressed',x===b));renderProjects(c)};$('#filters').append(b)});
renderProjects('All');
// articles (data/articles.json: [{title,url,summary}])
fetch('data/articles.json').then(r=>r.json()).then(list=>{const g=$('#artgrid');
if(!list.length){const c=mk('article','card');c.append(mk('h3','','OpenHPC, Warewulf, Slurm and Lustre series'),mk('p','','My multi-episode OpenHPC cluster build and other HPC write-ups are published on Medium.'),link('Read Articles','https://medium.com/@ahmedmejri5'));g.append(c);return}
list.forEach(a=>{const c=mk('article','card');c.append(mk('h3','',a.title),mk('p','',a.summary||''),link('Read Article',a.url));g.append(c)})}).catch(()=>{$('#artgrid').append(link('Read Articles','https://medium.com/@ahmedmejri5'))});
// active nav
const secs=[...menu.querySelectorAll('a')];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)secs.forEach(a=>a.classList.toggle('on',a.hash==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('main section').forEach(s=>io.observe(s));
// terminal
const out=$('#out'),inp=$('#in');
const say=(t,cls)=>{const d=mk('div',cls,t);out.append(d);out.scrollTop=out.scrollHeight};
const go=id=>{const s=document.getElementById(id);if(s)s.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'})};
const CMD={
help:()=>say('Commands: help  about  skills  projects  experience  github  contact  clear'),
about:()=>{say('Ahmed Mejri · HPC Systems Engineer\nFocus: HPC operations, GPU infrastructure, Kubernetes, AI inference, Linux, monitoring');go('about')},
skills:()=>{say('→ Slurm, PBS Professional, OpenHPC, Warewulf\n→ NVIDIA GPU / MIG, vLLM, Kubernetes\n→ Lustre, BeeGFS, NFS, GPFS\n→ InfiniBand, Linux, Python, Bash');go('expertise')},
projects:()=>{say('Scrolling to projects…');go('projects')},
experience:()=>{say('Scrolling to experience…');go('experience')},
github:()=>{say('Scrolling to GitHub section…');go('github')},
contact:()=>{say('ahmedmejri5@gmail.com');go('contact')},
whoami:()=>say('Ahmed Mejri\nRole: HPC Systems Engineer\nFocus: HPC Operations → GPU Infrastructure → Kubernetes → AI Inference → Linux → Monitoring'),
clear:()=>{out.innerHTML=''}};
say('$ whoami','hl');CMD.whoami();say('\nType "help" for commands.');
inp.addEventListener('keydown',e=>{if(e.key!=='Enter')return;const v=inp.value.trim().toLowerCase();inp.value='';if(!v)return;say('$ '+v,'hl');(CMD[v]||(()=>say('command not found: '+v+'. Try "help".')))()});

// terminal drawer
const wrapT=$('#termwrap'),tt=$('#termtoggle');
const setT=o=>{wrapT.hidden=!o;tt.setAttribute('aria-expanded',o);if(o)inp.focus()};
tt.onclick=()=>setT(wrapT.hidden);$('#termclose').onclick=()=>{setT(false);tt.focus()};
// stats
const stats=$('#stats');
const stat=(n,l,id)=>{const d=mk('div','stat');const b=mk('b','',n);if(id)b.id=id;d.append(b,mk('span','',l));stats.append(d)};
stat(PROJECTS.length,'featured projects');stat(CERTS.length,'credentials');stat('5','articles','st-art');stat('…','public GitHub repos','st-gh');
fetch('https://api.github.com/users/AhmedMejri1').then(r=>r.json()).then(u=>{$('#st-gh').textContent=u.public_repos??'–'}).catch(()=>{$('#st-gh').textContent='–'});
// search palette (Ctrl/Cmd+K)
const pal=$('#pal'),pq=$('#palq'),pl=$('#pall');
const ITEMS=[...[['Home','#home'],['About','#about'],['Expertise','#expertise'],['Projects','#projects'],['Case studies','#casestudies'],['Home lab','#homelab'],['Experience','#experience'],['Certifications','#certifications'],['Articles','#articles'],['GitHub','#github'],['Contact','#contact']].map(([t,h])=>({t,h,k:'Section'})),
...PROJECTS.map(p=>({t:p.title,h:p.links[0][1],k:'Project'})),...CERTS.map(c=>({t:c[0],h:c[2],k:'Credential'}))];
fetch('data/articles.json').then(r=>r.json()).then(a=>a.forEach(x=>ITEMS.push({t:x.title,h:x.url,k:'Article'}))).catch(()=>{});
function drawP(){const q=pq.value.toLowerCase();pl.innerHTML='';ITEMS.filter(i=>i.t.toLowerCase().includes(q)||i.k.toLowerCase().includes(q)).slice(0,8).forEach(i=>{const li=mk('li'),a=mk('a');a.href=i.h;if(/^https?:/.test(i.h)){a.target='_blank';a.rel='noopener'}a.append(i.t+' ',Object.assign(mk('small'),{textContent:'· '+i.k}));a.onclick=()=>pal.close();li.append(a);pl.append(li)})}
const openP=()=>{pq.value='';drawP();pal.showModal();pq.focus()};
$('#searchbtn').onclick=openP;pq.oninput=drawP;pal.addEventListener('click',e=>{if(e.target===pal)pal.close()});
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openP()}
else if(e.key==='`'&&!/INPUT|TEXTAREA/.test(document.activeElement.tagName)){e.preventDefault();setT(wrapT.hidden)}});

// ===== certifications with images + lightbox + issuer filter =====
const lb=mk('dialog','lb');lb.setAttribute('aria-label','Credential');document.body.append(lb);
lb.addEventListener('click',e=>{if(e.target===lb)lb.close()});
function openLB(c){lb.innerHTML='';const x=mk('button','btn sm','Close ✕');x.onclick=()=>lb.close();const im=mk('img');im.src=c[3];im.alt='Certificate: '+c[0];
const t=mk('h3','',c[0]);const v=link('Verify credential ↗',c[2]);lb.append(x,im,t,mk('p','note',c[1]+' · '+c[4]),v);lb.showModal()}
const cg=$('#certgrid'),cf=$('#certfilters');
function drawCerts(f){cg.innerHTML='';CERTS.filter(c=>f==='All'||c[1]===f).forEach(c=>{
const k=mk('article','card cert reveal');const b=mk('button','thumb');b.type='button';b.setAttribute('aria-label','View certificate: '+c[0]);
const im=mk('img');im.src=c[3];im.alt='Certificate image: '+c[0];im.loading='lazy';b.append(im);b.onclick=()=>openLB(c);
k.append(b,mk('div','meta mono',c[1]+' · '+c[4]),mk('h3','',c[0]),link('Verify credential ↗',c[2]));cg.append(k);io2.observe(k)})}
['All',...new Set(CERTS.map(c=>c[1]))].forEach((f,i)=>{const b=mk('button','',f);b.setAttribute('aria-pressed',i===0);b.onclick=()=>{cf.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));drawCerts(f)};cf.append(b)});
// ===== reveal on scroll =====
const io2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io2.unobserve(e.target)}}),{threshold:.12});
drawCerts('All');
document.querySelectorAll('.card,.case,.timeline li,.stat').forEach(e=>{e.classList.add('reveal');io2.observe(e)});
// ===== skills graph (bar length = number of technologies listed per domain) =====
const sg=$('#skgraph'),mx=Math.max(...SKILLS.map(s=>s[1].length));
SKILLS.forEach(([t,l])=>{const r=mk('div','bar');const lab=mk('span','',t);const tr=mk('div','track');const f=mk('i');f.style.setProperty('--w',(l.length/mx*100)+'%');tr.append(f);r.append(lab,tr,mk('b','mono',l.length));sg.append(r);io2.observe(r);r.classList.add('reveal')});
// click a skill → filter projects mentioning it
const clear=$('#skclear');
document.querySelectorAll('.skill li').forEach(li=>{li.tabIndex=0;li.setAttribute('role','button');
const go2=()=>{const key=li.textContent.split(/[ /,]/)[0].toLowerCase();const hit=PROJECTS.filter(p=>(p.title+p.desc+p.tech.join(' ')).toLowerCase().includes(key));
renderProjects('All');document.querySelectorAll('#pgrid .card').forEach((c,i)=>{c.style.opacity=hit.includes(PROJECTS[i])?1:.25});
clear.hidden=false;clear.textContent='Showing projects mentioning "'+li.textContent+'" ('+hit.length+') · clear';go('projects')};
li.onclick=go2;li.onkeydown=e=>{if(e.key==='Enter')go2()}});
clear.onclick=()=>{renderProjects('All');clear.hidden=true};
// ===== rotating role text =====
const rt=$('#rot');if(rt&&!matchMedia('(prefers-reduced-motion:reduce)').matches){const w=['HPC clusters','GPU infrastructure','Kubernetes platforms','LLM inference on H200','Slurm & PBS Professional'];let i=0;setInterval(()=>{i=(i+1)%w.length;rt.style.opacity=0;setTimeout(()=>{rt.textContent=w[i];rt.style.opacity=1},250)},2600)}
// ===== animated counters =====
document.querySelectorAll('.stat b').forEach(b=>{const n=parseInt(b.textContent);if(!n||matchMedia('(prefers-reduced-motion:reduce)').matches)return;let v=0;const t=setInterval(()=>{v++;b.textContent=v;if(v>=n)clearInterval(t)},60)});
