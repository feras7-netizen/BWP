// Safe, non-invasive event translations for cards/details.
// Avoids infinite MutationObserver loops by throttling and ignoring self-updates.

(function(){
  function getLang(){ return document.documentElement.lang || 'ar'; }
  function tKey(key){
    const lang = getLang();
    const dict = (window.I18N && window.I18N[lang]) || {};
    return dict[key] || null;
  }

  function setText(el, v){
    if (!el || v == null) return;
    if (el.textContent !== v) el.textContent = v; // لا تعدّل إذا نفسه
  }

  function translateCard(card){
    try{
      const link = card.querySelector('a[href*="event.html?id="]');
      if(!link) return;
      const id = new URL(link.getAttribute('href'), location.href).searchParams.get('id');
      if(!id) return;

      const prefix = `ev_${id}`;
      const titleEl = card.querySelector('h5');
      const catEl   = card.querySelector('.badge-cat');
      const shortEl = card.querySelector('.card-body p.small:not(.text-muted)');
      const detailsBtn = card.querySelector('a.btn.btn-accent, a.btn.btn-sm.btn-accent');

      setText(titleEl, tKey(`${prefix}_title`)    || (titleEl && titleEl.textContent));
      setText(catEl,   tKey(`${prefix}_category`) || (catEl   && catEl.textContent));
      setText(shortEl, tKey(`${prefix}_short`)    || (shortEl && shortEl.textContent));
      setText(detailsBtn, tKey('details')         || (detailsBtn && detailsBtn.textContent));
    }catch(e){ /* no-op */ }
  }

  function translateList(){
    const grid = document.getElementById('latestGrid');
    if(grid) grid.querySelectorAll('.card').forEach(translateCard);
    const list = document.getElementById('eventsContainer');
    if(list) list.querySelectorAll('.card').forEach(translateCard);
  }

  function translateDetails(){
    const id = new URLSearchParams(location.search).get('id');
    if(!id) return;
    const prefix = `ev_${id}`;
    setText(document.getElementById('evTitle'), tKey(`${prefix}_title`));
    setText(document.getElementById('evCat'),   tKey(`${prefix}_category`));
    setText(document.getElementById('evPrice'), tKey(`${prefix}_price`));
    setText(document.getElementById('evBody'),  tKey(`${prefix}_long`));
  }

  // --- Throttled update to avoid loops ---
  let scheduled = false;
  let isTranslating = false;
  function scheduleUpdate(){
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(()=>{
      scheduled = false;
      if (isTranslating) return;
      isTranslating = true;
      try{
        translateList();
        translateDetails();
      } finally {
        isTranslating = false;
      }
    });
  }

  // Observe language changes ONLY (آمن)
  const langObs = new MutationObserver((muts)=>{
    for(const m of muts){
      if (m.type==='attributes' && m.attributeName==='lang'){
        scheduleUpdate();
      }
    }
  });
  langObs.observe(document.documentElement, { attributes:true });

  // Observe only added nodes in main containers (بدون مراقبة تغييرات نصّنا)
  function observeContainerById(id){
    const el = document.getElementById(id);
    if(!el) return;
    const obs = new MutationObserver((muts)=>{
      // ترجم فقط عندما تُضاف عقد جديدة (بطاقات جديدة مثلاً)
      for(const m of muts){
        if (m.type==='childList' && m.addedNodes && m.addedNodes.length){
          scheduleUpdate();
          break;
        }
      }
    });
    obs.observe(el, { childList:true, subtree:true });
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    // محاولات خفيفة أولية للترجمة
    scheduleUpdate();
    setTimeout(scheduleUpdate, 200);
    setTimeout(scheduleUpdate, 600);

    // راقب القوائم للتحديثات (renderAll / renderLatest)
    observeContainerById('latestGrid');
    observeContainerById('eventsContainer');
  });

})();
