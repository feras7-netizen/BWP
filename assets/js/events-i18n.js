// Safe, non-invasive event translations for cards/details.
// Throttled, avoids infinite loops and heavy DOM churn.

(function(){
  function getLang(){ return document.documentElement.lang || 'ar'; }
  function tKey(key){
    const lang = getLang();
    const dict = (window.I18N && window.I18N[lang]) || {};
    return dict[key] || null;
  }
  function setText(el, v){
    if (!el || v == null) return;
    if (el.textContent !== v) el.textContent = v; // ما نغيّر إذا نفسه
  }

  function translateCard(card){
    try{
      const link = card.querySelector('a[href*="event.html?id="]');
      if(!link) return;
      const id = new URL(link.getAttribute('href'), location.href).searchParams.get('id');
      if(!id) return;

      const prefix = `ev_${id}`;
      setText(card.querySelector('h5'), tKey(`${prefix}_title`));
      setText(card.querySelector('.badge-cat'), tKey(`${prefix}_category`));
      setText(card.querySelector('.card-body p.small:not(.text-muted)`), tKey(`${prefix}_short`));
      const detailsBtn = card.querySelector('a.btn.btn-accent, a.btn.btn-sm.btn-accent');
      setText(detailsBtn, tKey('details'));
    }catch(e){}
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
    const p = `ev_${id}`;
    setText(document.getElementById('evTitle'), tKey(`${p}_title`));
    setText(document.getElementById('evCat'),   tKey(`${p}_category`));
    setText(document.getElementById('evPrice'), tKey(`${p}_price`));
    setText(document.getElementById('evBody'),  tKey(`${p}_long`));
  }

  // --- Throttle update ---
  let scheduled = false, busy = false;
  function scheduleUpdate(){
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(()=>{
      scheduled = false;
      if (busy) return;
      busy = true;
      try { translateList(); translateDetails(); }
      finally { busy = false; }
    });
  }

  // راقب فقط تغيّر اللغة
  const langObs = new MutationObserver(muts=>{
    for(const m of muts){
      if (m.type==='attributes' && m.attributeName==='lang'){ scheduleUpdate(); }
    }
  });
  langObs.observe(document.documentElement, { attributes:true });

  // راقب إضافة عناصر جديدة للقوائم (بدون مراقبة تغييرات النص)
  function observeContainer(id){
    const el = document.getElementById(id);
    if(!el) return;
    const obs = new MutationObserver(muts=>{
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
    scheduleUpdate();
    setTimeout(scheduleUpdate, 200);
    setTimeout(scheduleUpdate, 600);
    observeContainer('latestGrid');
    observeContainer('eventsContainer');
  });
})();
