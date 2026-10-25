(() => {
  "use strict";
  const D = window.PHP2SHELL_DATA;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  let lang = localStorage.getItem("php2shell-lang") || "en";
  let activeFilter = "all";
  let toastTimer;

  function t(path) {
    return path.split(".").reduce((o, k) => o?.[k], D.i18n[lang]) ?? path;
  }

  function renderNav() {
    const items = [
      ["overview", "nav.overview"], ["timeline", "nav.timeline"], ["mechanism", "nav.mechanism"],
      ["exposure", "nav.exposure"], ["response", "nav.response"], ["sources", "nav.sources"]
    ];
    $("#nav").innerHTML = items.map(([id, key]) => `<a href="#${id}" data-nav="${id}">${t(key)}</a>`).join("");
  }

  function renderPhases() {
    $("#phaseGrid").innerHTML = D.i18n[lang].phases.map((p, i) => `
      <article class="phase-card reveal" style="transition-delay:${i * 80}ms">
        <span class="phase-n">${t("ui.phase")} ${p.n}</span><h3>${p.title}</h3><span class="phase-date">${p.date}</span>
        <p>${p.text}</p><span class="phase-glyph">${p.n}</span>
      </article>`).join("");
  }

  function evidenceLabel(type) {
    return type === "confirmed" ? t("common.confirmed") : t("common.reported");
  }

  function renderTimeline() {
    const labels = { all:t("common.all"), "phase-1":D.i18n[lang].phases[0].date, "phase-2":D.i18n[lang].phases[1].date, "phase-3":D.i18n[lang].phases[2].date, "phase-4":D.i18n[lang].phases[3].date };
    $("#timelineControls").innerHTML = Object.entries(labels).map(([id,label]) => `<button class="filter-btn ${id === activeFilter ? "on" : ""}" data-filter="${id}">${label}</button>`).join("");
    const items = D.timeline.filter(x => activeFilter === "all" || x.phase === activeFilter).map(x => {
      const localized = lang === "pl" ? D.timelinePl?.[x.date] : D.timelineEn?.[x.date];
      return localized ? { ...x, ...localized } : x;
    });
    $("#timelineList").innerHTML = items.map(x => `
      <article class="tl-item ${x.type}" data-phase="${x.phase}">
        <div class="tl-date">${x.date}<b>${x.phaseLabel}</b></div>
        <div class="tl-content"><h3>${x.title}</h3><p>${x.detail}</p>
          <div class="tl-meta"><span class="evidence-badge ${x.evidence}">${evidenceLabel(x.evidence)}</span>
          <span class="src-links">${x.sources.map(id => `<a href="#source-${id}" title="Source ${id}" data-src="${id}">${id}</a>`).join("")}</span></div>
        </div>
      </article>`).join("");
    observeReveals();
  }

  function renderDetails() {
    const d = D.details[lang];
    $("#primitiveTitle").textContent = d.primitivesTitle;
    $("#primitiveIntro").textContent = d.primitivesIntro;
    $("#primitiveGrid").innerHTML = [1,2,3,4,5].map(i => `
      <article class="primitive-card"><span>${String(i).padStart(2,"0")}</span><h4>${d[`p${i}title`]}</h4><p>${d[`p${i}text`]}</p><i></i></article>`).join("");
    $("#vectorsTitle").textContent = d.vectorsTitle;
    $("#vectorsIntro").textContent = d.vectorsIntro;
    $("#v1title").textContent = d.v1title; $("#v1text").textContent = d.v1text;
    $("#v2title").textContent = d.v2title; $("#v2text").textContent = d.v2text;
    $("#assetsTitle").textContent = d.assetsTitle;
    $("#assetsIntro").textContent = d.assetsIntro;
    const apps = ["WordPress 7.1.2","Drupal 11.4.3","Joomla 6.1.4","MediaWiki 1.46.2","Roundcube 1.7.4","Magento 2.4.9","phpMyAdmin 5.2.3","Nextcloud 35.0.1","Laravel 13.11","Symfony 8.1","WHMCS"];
    $("#assetGrid").innerHTML = apps.map(x=>`<span>${x}<i>✓</i></span>`).join("");
    $("#versionsTitle").textContent = d.versionsTitle;
    $("#versionsIntro").textContent = d.versionsIntro;
    const versions = [
      ["PHP 8.5",d.v85,"ACTIVE",d.vaction],["PHP 8.4",d.v84,"ACTIVE",d.vaction],["PHP 8.3",d.v83,"SECURITY",d.vaction],["PHP 8.2",d.v82,"EOL 31 DEC",d.vaction],
      ["PHP 7.4 / 8.0 / 8.1",d.vlegacy,"EOL",d.vactionEol],["PHP 3.x — 7.3",d.veol,"DEEP EOL",d.vactionEol]
    ];
    $("#versionGrid").innerHTML = versions.map(v=>`<article><span>${v[0]}</span><b>${v[1]}</b><i>${v[2]}</i><p>${v[3]}</p></article>`).join("");
  }

  function renderMatrix() {
    const r = D.i18n[lang].response;
    const rows = [[r.c1,r.v1,r.w1,r.x1],[r.c2,r.v2,r.w2,r.x2],[r.c3,r.v3,r.w3,r.x3],[r.c4,r.v4,r.w4,r.x4],[r.c5,r.v5,r.w5,r.x5]];
    $("#matrixBody").innerHTML = rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("");
  }

  function renderSources() {
    const types = D.i18n[lang].ui.sourceTypes;
    $("#sourceList").innerHTML = D.sources.map(s => `
      <div class="source-row" id="source-${s.id}"><span class="source-no">[${String(s.id).padStart(2,"0")}]</span>
      <div class="source-title"><a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.title}</a><span class="source-pub">${s.publisher}</span></div>
      <span class="source-type">${types[s.type] || s.type}</span><span class="source-date">${s.date}</span></div>`).join("");
  }

  function renderIOCs() {
    const i = D.iocs;
    const labels = D.i18n[lang].ui.iocTypes;
    const groups = [
      [labels[0], i.sources.join("  ·  ")],
      [labels[1], i.loader],
      [labels[2], i.c2],
      [labels[3], i.targets],
      [labels[4], i.userAgents.join("  ·  ")]
    ];
    $("#iocGrid").innerHTML = groups.map(([label,value]) => `
      <div class="ioc-item"><span>${label}</span><code>${value}</code><button class="copy-btn" data-copy="${value.replaceAll('"','&quot;')}">COPY</button></div>`).join("");
  }

  function applyI18n() {
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
    $$("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
    $$(".lang-switch span").forEach(el => el.classList.toggle("on", el.textContent.toLowerCase() === lang));
    $(".skip").textContent = t("ui.skip");
    $(".hero-readout > span").textContent = t("ui.boundary");
    $(".hero-readout b").innerHTML = `${t("ui.heap")} <span id="heapState">${t("ui.mutable")}</span>`;
    $(".scroll-cue").lastChild.textContent = ` ${t("ui.scroll")}`;
    $(".film-caption span").textContent = t("ui.film");
    $(".chart-type.m").textContent = t("ui.modatChart");
    $(".chart-type.v").textContent = t("ui.vulnChart");
    $(".chart-type.c").textContent = t("ui.censysChart");
    $(".bar-label.m").textContent = t("ui.unsupported");
    $(".bar-label.v").textContent = t("ui.eolSplit");
    $(".sapi-card:nth-child(3) > b").textContent = t("ui.sapiConditional");
    $(".chain-node:nth-child(1) span").textContent = t("ui.scanSpray");
    $$(".chain-node")[3].querySelector("span").textContent = t("ui.protocols");
    $(".matrix-head span").textContent = t("ui.patchFirst");
    renderNav(); renderPhases(); renderTimeline(); renderDetails(); renderMatrix(); renderSources(); renderIOCs();
    localStorage.setItem("php2shell-lang", lang);
    document.title = lang === "en" ? "PHP2Shell — Intelligence Map" : "PHP2Shell — Mapa Analizy Zagrożeń";
  }

  function observeReveals() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("show"); io.unobserve(entry.target); } });
    }, { threshold:.08 });
    $$(".hero-copy.reveal:not(.show), .section-heading.reveal:not(.show), .phase-card.reveal:not(.show), .timeline-shell .reveal:not(.show)").forEach(el => io.observe(el));
  }

  function toast(msg) {
    const el = $("#toast"); el.textContent = msg; el.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 1600);
  }

  // Ambient starfield
  function spaceField() {
    const c = $("#space"); if (!c) return;
    const ctx = c.getContext("2d"); let w, h, stars = [];
    function resize() { w = c.width = innerWidth * devicePixelRatio; h = c.height = innerHeight * devicePixelRatio; c.style.width = innerWidth+"px"; c.style.height = innerHeight+"px"; stars = Array.from({length:Math.min(130,Math.floor(innerWidth/10))},()=>({x:Math.random()*w,y:Math.random()*h,z:Math.random()*1.7+.25,r:Math.random()*1.2+.15,v:Math.random()*.12+.02})); }
    function frame() { ctx.clearRect(0,0,w,h); for(const s of stars){ s.y += s.v*s.z*devicePixelRatio; if(s.y>h) s.y=-2; ctx.globalAlpha=Math.min(.55,s.z*.3); ctx.fillStyle="#91c9df"; ctx.beginPath();ctx.arc(s.x,s.y,s.r*s.z*devicePixelRatio,0,Math.PI*2);ctx.fill(); } requestAnimationFrame(frame); }
    resize(); addEventListener("resize",resize,{passive:true}); if(!reduced) frame();
  }

  // Cinematic brief: six deterministic chapters rendered to canvas.
  function cinematic() {
    const c = $("#filmCanvas"), ctx = c.getContext("2d"); let raf, start=performance.now(), active=true;
    const chapters = lang === "en" ? [
      ["17 OCT 2026 · 00:00", "A probe reaches the honeypot before the advisory exists."],
      ["21 OCT 2026 · 07:41", "Patched container images become public six hours early."],
      ["55 MINUTES LATER", "The first automated exploit request is observed."],
      ["THE REQUEST LIFECYCLE", "OOM → longjmp → invalid state → cleanup trusts the heap."],
      ["THE WORKER LIFECYCLE", "Request-owned state survives into the next request."],
      ["THE ONLY COMPLETE FIX", "Patch the runtime. Rebuild images. Restart every worker."]
    ] : [
      ["17 X 2026 · 00:00", "Sonda trafia do honeypota, zanim istnieje biuletyn."],
      ["21 X 2026 · 07:41", "Załatane obrazy kontenerowe stają się publiczne sześć godzin za wcześnie."],
      ["55 MINUT PÓŹNIEJ", "Obserwujemy pierwsze zautomatyzowane żądanie exploita."],
      ["CYKL ŻYCIA ŻĄDANIA", "OOM → longjmp → nieprawidłowy stan → czyszczenie ufa stertze."],
      ["CYKL ŻYCIA PROCESU", "Stan żądania przetrwa do kolejnego żądania."],
      ["JEDYNA PEŁNA POPRAWKA", "Załataj runtime. Przebuduj obrazy. Zrestartuj każdy proces."]
    ];
    function resize(){c.width=innerWidth*devicePixelRatio;c.height=innerHeight*devicePixelRatio;c.style.width=innerWidth+"px";c.style.height=innerHeight+"px";}
    function draw(now){
      if(!active)return; const t=(now-start)/1000, dur=6.2, idx=Math.min(chapters.length-1,Math.floor(t/dur)), local=(t%dur)/dur;
      const chapterText = chapters[idx][1];
      const caption = $("#filmText");
      if (caption && caption.textContent !== chapterText) caption.textContent = chapterText;
      ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0); const W=innerWidth,H=innerHeight;
      ctx.fillStyle="#020408";ctx.fillRect(0,0,W,H);
      const g=ctx.createRadialGradient(W*.58,H*.45,0,W*.58,H*.45,W*.6);g.addColorStop(0,`rgba(83,217,255,${.12*(1-local)})`);g.addColorStop(1,"transparent");ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
      // request particles
      for(let i=0;i<80;i++){const a=i/80*Math.PI*2+local*2;const r=(.12+((i*37)%100)/100*.5)*Math.min(W,H);const x=W*.58+Math.cos(a)*r,y=H*.45+Math.sin(a)*r;ctx.globalAlpha=.08+.18*(1-local);ctx.fillStyle=i%7===0?"#ff5268":"#53d9ff";ctx.beginPath();ctx.arc(x,y,1+i%3,0,Math.PI*2);ctx.fill();}
      ctx.globalAlpha=1;ctx.strokeStyle=`rgba(83,217,255,${.28*(1-local)})`;ctx.lineWidth=1;for(let r=80;r<420;r+=55){ctx.beginPath();ctx.arc(W*.58,H*.45,r*(.7+local*.3),0,Math.PI*2);ctx.stroke();}
      // central code gate
      ctx.save();ctx.translate(W*.58,H*.45);ctx.rotate(local*.8);ctx.strokeStyle="#53d9ff";ctx.globalAlpha=.7;ctx.lineWidth=2;ctx.strokeRect(-58,-58,116,116);ctx.restore();
      ctx.fillStyle="#53d9ff";ctx.font="600 13px 'DM Mono'";ctx.textAlign="center";ctx.fillText("LONGJMP",W*.58,H*.45+4);
      // chapter title
      ctx.textAlign="left";ctx.fillStyle="#53d9ff";ctx.font="500 11px 'DM Mono'";ctx.fillText(chapters[idx][0],clamp((1-local)*50,20,W-340),H*.2);
      ctx.fillStyle="#eef3fb";ctx.font=`600 ${Math.min(38,innerWidth*.042)}px 'Space Grotesk'`;wrapText(ctx,chapterText,clamp((1-local)*50,20,W-380),H*.27,Math.min(720,W-400),48);
      // progress
      const p=(idx+local)/chapters.length;ctx.fillStyle="rgba(255,255,255,.08)";ctx.fillRect(30,H-70,W-60,1);ctx.fillStyle="#53d9ff";ctx.fillRect(30,H-70,(W-60)*p,1);
      if(t>=chapters.length*dur){start=performance.now();}
      raf=requestAnimationFrame(draw);
    }
    function wrapText(c,text,x,y,maxWidth,lh){const words=text.split(" ");let line="";for(const word of words){const test=line+word+" ";if(c.measureText(test).width>maxWidth&&line){c.fillText(line,x,y);line=word+" ";y+=lh;}else line=test;}c.fillText(line,x,y);}
    resize();addEventListener("resize",resize,{passive:true});cancelAnimationFrame(raf);raf=requestAnimationFrame(draw);
    return ()=>{active=false;cancelAnimationFrame(raf);removeEventListener("resize",resize);};
  }

  let closeFilmFn = null;
  function openFilm() { $("#film").classList.add("open"); document.body.style.overflow="hidden"; closeFilmFn = cinematic(); }
  function closeFilm() { $("#film").classList.remove("open"); document.body.style.overflow=""; closeFilmFn?.(); }

  // Optional low-volume ambient sound generated in WebAudio.
  let audioCtx, ambientOn=false;
  function toggleSound(){
    if(!audioCtx){audioCtx=new (window.AudioContext||window.webkitAudioContext)();const gain=audioCtx.createGain();gain.gain.value=.018;gain.connect(audioCtx.destination);const osc=audioCtx.createOscillator();osc.type="sine";osc.frequency.value=55;const lfo=audioCtx.createOscillator();lfo.frequency.value=.08;const lg=audioCtx.createGain();lg.gain.value=.65;lfo.connect(lg);lg.connect(osc.frequency);osc.connect(gain);osc.start();lfo.start();ambientOn=true;}else{ambientOn=!ambientOn;audioCtx.suspend();audioCtx.resume();}
    $("#soundToggle").classList.toggle("on",ambientOn);
  }

  function bind() {
    $("#langToggle").addEventListener("click",()=>{lang=lang==="en"?"pl":"en";applyI18n();});
    $("#soundToggle").addEventListener("click",toggleSound);
    $("#openFilm").addEventListener("click",openFilm); $("#closeFilm").addEventListener("click",closeFilm);
    addEventListener("keydown",e=>{if(e.key==="Escape")closeFilm();});
    document.addEventListener("click",e=>{
      const filter=e.target.closest("[data-filter]"); if(filter){activeFilter=filter.dataset.filter;renderTimeline();return;}
      const copy=e.target.closest("[data-copy]"); if(copy){navigator.clipboard?.writeText(copy.dataset.copy).then(()=>toast(t("common.copied"))).catch(()=>toast(copy.dataset.copy));return;}
      const src=e.target.closest("[data-src]"); if(src){const row=$(`#source-${src.dataset.src}`);if(row){row.scrollIntoView({behavior:"smooth",block:"center"});row.style.background="rgba(83,217,255,.08)";setTimeout(()=>row.style.background="",1300);}}
    });
    const sections=$$("main section[id]");const navLinks=$$("[data-nav]");
    const spy=new IntersectionObserver(entries=>entries.forEach(en=>{if(en.isIntersecting){navLinks.forEach(a=>a.classList.toggle("active",a.dataset.nav===en.target.id));}}),{rootMargin:"-40% 0px -55%"});
    sections.forEach(s=>spy.observe(s));
    const counters=$$("[data-count]");const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,end=parseFloat(el.dataset.count);let st=null;function step(ts){if(!st)st=ts;const p=Math.min(1,(ts-st)/1300);el.textContent=(end*(1-Math.pow(1-p,3))).toFixed(end%1?2:0);if(p<1)requestAnimationFrame(step);}requestAnimationFrame(step);cio.unobserve(el);}),{threshold:.5});counters.forEach(c=>cio.observe(c));
  }

  applyI18n(); bind(); spaceField(); observeReveals();
})();
