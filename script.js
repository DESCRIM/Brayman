/* Brayman — свечение курсора, кнопки, анимации, игра */
(function(){
var pills=document.querySelectorAll('.pill'),cards=document.querySelectorAll('.card');
pills.forEach(function(b){b.onclick=function(){pills.forEach(function(x){x.setAttribute('aria-pressed',x===b)});cards.forEach(function(c){c.hidden=b.dataset.f!=='all'&&c.dataset.c!==b.dataset.f})}});
var ch=document.querySelectorAll('.opt input'),go=document.getElementById('go');
function upd(){var v=[].filter.call(ch,function(i){return i.checked}).map(function(i){return i.value});
document.getElementById('cnt').textContent=v.length+' шт.';
document.getElementById('sum').textContent=v.length?v.join(', '):'Выберите хотя бы одну вещь';
go.href='https://t.me/danlekzzz'+(v.length?'?text='+encodeURIComponent('Привет! Хочу заказать: '+v.join(', ')):'')}
ch.forEach(function(i){i.onchange=upd});
})();
(function(){
var cv=document.getElementById('gc'),x=cv.getContext('2d'),W,H,d;
function rs(){d=Math.min(devicePixelRatio||1,2);W=cv.clientWidth;H=cv.clientHeight;cv.width=W*d;cv.height=H*d;x.setTransform(d,0,0,d,0,0);if(!run)hint()}
var T=['🧢','👕','🔥','💀'],V=[1,1,3,-2],it=[],fx=[],sc=0,tl=20,run=false,last=0,sp=0,best=0;
try{best=+localStorage.getItem('bb')||0}catch(e){}
var gs=document.getElementById('gs'),gt=document.getElementById('gt'),gb=document.getElementById('gb'),gm=document.getElementById('gm'),btn=document.getElementById('gbtn');
gb.textContent=best;
function hint(){x.clearRect(0,0,W,H);x.fillStyle='rgba(255,255,255,.5)';x.font='600 16px Manrope,sans-serif';x.textAlign='center';x.fillText('Нажми «Играть»',W/2,H/2)}
function spawn(){var r=Math.random(),k=r<.4?0:r<.75?1:r<.88?2:3;it.push({k:k,x:30+Math.random()*(W-60),y:-30,v:(90+Math.random()*100)*(k==2?1.5:1)+(20-tl)*6,s:36+Math.random()*12})}
function frame(t){if(!run)return;var dt=Math.min((t-last)/1000,.05);last=t;tl-=dt;sp-=dt;
if(sp<=0){spawn();sp=Math.max(.28,.6-(20-tl)*.015)}
x.clearRect(0,0,W,H);x.textAlign='center';x.textBaseline='middle';
for(var i=it.length-1;i>=0;i--){var o=it[i];o.y+=o.v*dt;if(o.y>H+40){it.splice(i,1);continue}x.font=o.s+'px serif';x.fillText(T[o.k],o.x,o.y)}
for(var j=fx.length-1;j>=0;j--){var f=fx[j];f.t-=dt;f.y-=40*dt;if(f.t<=0){fx.splice(j,1);continue}x.globalAlpha=f.t/.6;x.fillStyle=f.c;x.font='800 22px Unbounded,sans-serif';x.fillText(f.s,f.x,f.y);x.globalAlpha=1}
gt.textContent=Math.max(0,Math.ceil(tl));
if(tl<=0)return end();requestAnimationFrame(frame)}
function end(){run=false;btn.disabled=false;btn.textContent='Ещё раз';
if(sc>best){best=sc;gb.textContent=best;try{localStorage.setItem('bb',best)}catch(e){}}
gm.textContent=sc>=20?'Результат: '+sc+'. Ты в теме Brayman, загляни в каталог!':'Результат: '+sc+'. Попробуй ещё раз.';hint()}
btn.onclick=function(){it=[];fx=[];sc=0;tl=20;sp=0;run=true;btn.disabled=true;gs.textContent=0;gt.textContent=20;gm.textContent='Лови 🧢 и 👕, не трогай 💀';last=performance.now();requestAnimationFrame(frame)};
cv.addEventListener('pointerdown',function(e){if(!run)return;var r=cv.getBoundingClientRect(),px=e.clientX-r.left,py=e.clientY-r.top;
for(var i=it.length-1;i>=0;i--){var o=it[i];if(Math.abs(px-o.x)<o.s*.75&&Math.abs(py-o.y)<o.s*.75){var p=V[o.k];sc=Math.max(0,sc+p);gs.textContent=sc;fx.push({s:(p>0?'+':'')+p,x:o.x,y:o.y,t:.6,c:p>0?'#ff7a70':'#bbb'});it.splice(i,1);break}}});
addEventListener('resize',rs);rs();
})();
(function(){
var el=document.getElementById('rp');
if(!el)return;
if(matchMedia('(hover:none)').matches){el.remove();return}
var x=0,y=0,tx=0,ty=0,on=false,seen=false;
addEventListener('pointermove',function(e){if(e.pointerType!=='mouse')return;tx=e.clientX;ty=e.clientY;if(!seen){x=tx;y=ty;seen=true}el.style.opacity=1;if(!on){on=true;requestAnimationFrame(f)}});
document.documentElement.addEventListener('mouseleave',function(){el.style.opacity=0});
function f(){x+=(tx-x)*.12;y+=(ty-y)*.12;el.style.transform='translate3d('+x+'px,'+y+'px,0)';if(Math.abs(tx-x)>.3||Math.abs(ty-y)>.3)requestAnimationFrame(f);else on=false}
})();
(function(){
if(matchMedia('(hover:none)').matches)return;
document.querySelectorAll('.btn').forEach(function(b){
b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.setProperty('--mx',((e.clientX-r.left-r.width/2)*.22)+'px');b.style.setProperty('--my',((e.clientY-r.top-r.height/2)*.35)+'px');b.style.setProperty('--s','1.07')});
b.addEventListener('pointerleave',function(){b.style.setProperty('--mx','0px');b.style.setProperty('--my','0px');b.style.setProperty('--s','1')});
b.addEventListener('pointerdown',function(){b.style.setProperty('--s','.96')});
b.addEventListener('pointerup',function(){b.style.setProperty('--s','1.07')});
})})();
(function(){
var de=document.documentElement;
if(matchMedia('(prefers-reduced-motion:reduce)').matches||!('IntersectionObserver' in window)){de.classList.remove('js');return}
var els=document.querySelectorAll('h1,.lead,.row,.mq,h2,.sub,.pills,.card,.feat li,.kit>.box,.ask,#game .box');
var io=new IntersectionObserver(function(es){es.forEach(function(en){if(!en.isIntersecting)return;var el=en.target;io.unobserve(el);el.classList.add('in');setTimeout(function(){el.classList.remove('rv','in');el.style.transitionDelay=''},1400)})},{threshold:.1,rootMargin:'0px 0px -5% 0px'});
els.forEach(function(el){el.classList.add('rv');el.style.transitionDelay=Math.min([].indexOf.call(el.parentNode.children,el),4)*90+'ms';io.observe(el)});
})();
