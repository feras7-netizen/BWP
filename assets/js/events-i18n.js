
// Non-invasive event translations: keeps EVENTS and markup EXACTLY as-is.
// It watches DOM for rendered cards/details and swaps visible text using window.I18N.

(function(){
  function getLang(){ return document.documentElement.lang || 'ar'; }
  function t(key){ const lang=getLang(); const dict=(window.I18N && window.I18N[lang])||{}; return dict[key] || null; }

  function translateCard(card){
    try{
      // Find ID from the details link inside this card
      const link = card.querySelector('a[href*="event.html?id="]');
      if(!link) return;
      const id = new URL(link.getAttribute('href'), location.href).searchParams.get('id');
      if(!id) return;
      const titleEl = card.querySelector('h5');
      const catEl = card.querySelector('.badge-cat');
      const shortEl = card.querySelector('.card-body p.small:not(.text-muted)');
      const detailsBtn = card.querySelector('a.btn.btn-accent, a.btn.btn-sm.btn-accent');
      const lang = getLang();
      const prefix = `ev_${id}`;
      if(titleEl){ const v=t(`${prefix}_title`); if(v) titleEl.textContent = v; }
      if(catEl){ const v=t(`${prefix}_category`); if(v) catEl.textContent = v; }
      if(shortEl){ const v=t(`${prefix}_short`); if(v) shortEl.textContent = v; }
      if(detailsBtn){ const v=t('details'); if(v) detailsBtn.textContent = v; }
      // Date line stays as original; we won't touch it to keep exact formatting
    }catch(e){ /* no-op */ }
  }

  function translateList(){
    const grid = document.getElementById('latestGrid');
    if(grid){ grid.querySelectorAll('.card').forEach(translateCard); }
    const list = document.getElementById('eventsContainer');
    if(list){ list.querySelectorAll('.card').forEach(translateCard); }
  }

  function translateDetails(){
    const id = new URLSearchParams(location.search).get('id');
    if(!id) return;
    const prefix = `ev_${id}`;
    const tTitle = document.getElementById('evTitle');
    const tCat = document.getElementById('evCat');
    const tPrice = document.getElementById('evPrice');
    const tBody = document.getElementById('evBody');
    const vTitle = t(`${prefix}_title`);
    const vCat = t(`${prefix}_category`);
    const vPrice = t(`${prefix}_price`);
    const vBody = t(`${prefix}_long`);
    if(vTitle && tTitle) tTitle.textContent = vTitle;
    if(vCat && tCat) tCat.textContent = vCat;
    if(vPrice && tPrice) tPrice.textContent = vPrice;
    if(vBody && tBody) tBody.textContent = vBody;
  }

  function updateAll(){
    translateList();
    translateDetails();
  }

  // Observe language changes (documentElement.lang)
  const mo = new MutationObserver((muts)=>{
    for(const m of muts){
      if(m.type==='attributes' && m.attributeName==='lang'){ updateAll(); }
    }
  });
  mo.observe(document.documentElement, { attributes:true });

  // Observe lists for re-render
  function observeNode(id){
    const el = document.getElementById(id);
    if(!el) return;
    const obs = new MutationObserver(()=>{ updateAll(); });
    obs.observe(el, { childList:true, subtree:true });
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    // initial
    setTimeout(updateAll, 50);
    setTimeout(updateAll, 250);
    // observe containers
    observeNode('latestGrid');
    observeNode('eventsContainer');
    // also translate details (when present)
    observeNode('evTitle');
    observeNode('evBody');
  });

})();
