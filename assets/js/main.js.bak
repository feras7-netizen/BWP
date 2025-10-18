// EN: App data + rendering utilities for cards, lists, and page-level features.

const EVENTS = [
  {
    "id": "cu01",
    "title": "فعالية مدينة ملاهي للأطفال",
    "date": "2025-10-12",
    "time": "16:00",
    "location": "",
    "category": "عائلي",
    "image": "assets/img/العاب.jfif",
    "short": "ألعاب وأنشطة ترفيهية للعائلة.",
    "long": "يوم مليء بالألعاب الحركية، عروض دمى، وأركان ترفيه.",
    "price": "مجاني"
  },
  {
    "id": "cu02",
    "title": "فعالية شارع العشّاق",
    "date": "2025-10-15",
    "time": "18:30",
    "location": "",
    "category": "ثقافة",
    "image": "assets/img/شارع العشاق.jfif",
    "short": "مهرجان شارع مع موسيقى وفنون.",
    "long": "أجواء مفتوحة مع موسيقى حيّة وعروض رسم على الجدران.",
    "price": "مجاني"
  },
  {
    "id": "cu03",
    "title": "فعالية يوم التحرير",
    "date": "2025-10-18",
    "time": "11:00",
    "location": "",
    "category": "ثقافة",
    "image": "assets/img/يوم التحرير.jfif",
    "short": "احتفالية وطنية وبرنامج عروض.",
    "long": "كلمات، فقرات فنية، ومعرض صور يوثّق محطات تاريخية.",
    "price": "مجاني"
  },
  {
    "id": "cu04",
    "title": "فعالية الغناء",
    "date": "2025-10-21",
    "time": "19:30",
    "location": "",
    "category": "موسيقى",
    "image": "assets/img/مسرح.jfif",
    "short": "أمسية غنائية بمشاركة مواهب شابة.",
    "long": "حفلة موسيقية بأعمال تراثية ومعاصرة مع فرقة محلية.",
    "price": "15000 ل.س"
  },
  {
    "id": "cu05",
    "title": "فعالية الاحتفال بالكريسمس",
    "date": "2025-10-24",
    "time": "17:00",
    "location": "",
    "category": "عائلي",
    "image": "assets/img/كنيسةة.jfif",
    "short": "شجرة وزينة وتراتيل وألعاب للأطفال.",
    "long": "سوق صغير، صور مع سانتا، ومساحة هدايا رمزية.",
    "price": "مجاني"
  },
  {
    "id": "cu06",
    "title": "فعالية رسم",
    "date": "2025-10-27",
    "time": "15:30",
    "location": "",
    "category": "ثقافة",
    "image": "assets/img/رسم.jfif",
    "short": "ورشة رسم حيّ لجميع المستويات.",
    "long": "أدوات بسيطة، إرشاد خطوة بخطوة، ومعرض لأعمال المشاركين.",
    "price": "8000 ل.س"
  },
  {
    "id": "cu07",
    "title": "فعالية تسوّق",
    "date": "2025-10-30",
    "time": "12:00",
    "location": "",
    "category": "عائلي",
    "image": "assets/img/سوق.jfif",
    "short": "بازار منتجات محلية.",
    "long": "أجنحة حرف يدوية، مأكولات، وعروض خاصة بالزوار.",
    "price": "مجاني"
  },
  {
    "id": "cu08",
    "title": "فعالية غناء",
    "date": "2025-11-02",
    "time": "20:00",
    "location": "",
    "category": "موسيقى",
    "image": "assets/img/عالم (3).jfif",
    "short": "سهرة غنائية في الهواء الطلق.",
    "long": "مزيج من الأغنيات المستقلة والمعروفة مع تجهيزات صوتية.",
    "price": "15000 ل.س"
  }
];

function fmtDate(iso){const d=new Date(iso+'T00:00:00');return d.toLocaleDateString('ar-SY',{year:'numeric',month:'long',day:'numeric'});}
function card(ev){
  return `
  <div class="col"><div class="card h-100 shadow-sm">
    <img src="${ev.image}" width="640" height="360" loading="lazy" class="card-img-top" alt="${ev.title}">
    <div class="card-body">
      <span class="badge badge-cat">${ev.category}</span>
      <h5 class="mt-2">${ev.title}</h5>
      <p class="text-muted small">${fmtDate(ev.date)}${ev.location?' • '+ev.location:''}</p>
      <p class="small">${ev.short}</p>
      <a href="event.html?id=${ev.id}" class="btn btn-sm btn-accent">التفاصيل</a>
    </div>
  </div></div>`;
}
function applySearch(list){
  const q=(document.getElementById('q')?.value||'').trim().toLowerCase();
  const cat=(document.getElementById('cat')?.value||'').trim();
  const after=(document.getElementById('after')?.value||'').trim();
  return list.filter(ev=>{
    if(q){const hay=((ev.title||'')+' '+(ev.short||'')+' '+(ev.location||'')+' '+(ev.category||'')).toLowerCase(); if(!hay.includes(q)) return false;}
    if(cat && ev.category!==cat) return false;
    if(after && (ev.date<after)) return false;
    return true;
  });
}
async function renderLatest(){ const grid=document.getElementById('latestGrid'); if(!grid) return; grid.innerHTML = EVENTS.slice(0,8).map(card).join(''); }
async function renderAll(){ const c=document.getElementById('eventsContainer'); if(!c) return; const list=applySearch(EVENTS); c.innerHTML=list.length?list.map(card).join(''):`<div class="col-12"><div class="alert alert-warning">لا نتائج مطابقة.</div></div>`; }
async function renderEvent(){ const id=new URLSearchParams(location.search).get('id'); if(!id) return; const ev=EVENTS.find(e=>e.id===id)||EVENTS[0]; if(!ev) return; const img=document.getElementById('evImg'); img.src=ev.image; img.alt=ev.title; img.width=1280; img.height=720; document.getElementById('evTitle').textContent=ev.title; document.getElementById('evMeta').textContent=`${fmtDate(ev.date)} — ${ev.time}${ev.location?' — '+ev.location:''}`; document.getElementById('evBody').textContent=ev.long; document.getElementById('evCat').textContent=ev.category; document.getElementById('evPrice').textContent=ev.price; }
function setupSearch(){ const q=document.getElementById('q'); const cat=document.getElementById('cat'); const after=document.getElementById('after'); let t=null; if(q) q.addEventListener('input',()=>{ clearTimeout(t); t=setTimeout(renderAll,200); }); if(cat) cat.addEventListener('change', renderAll); if(after) after.addEventListener('change', renderAll); }
window.renderAll = renderAll;
document.addEventListener('DOMContentLoaded', ()=>{ renderLatest(); renderAll(); renderEvent(); setupSearch(); });


// ===== Contact form basic validation + Bootstrap Alerts =====
// EN: This function reads the contact form, validates required fields,
// and shows a success/failure alert without actually sending anything.
function handleContactForm(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const fd = new FormData(form);
    const name = (fd.get('name')||'').trim();
    const email = (fd.get('email')||'').trim();
    const message = (fd.get('message')||'').trim();
    const alertArea = document.getElementById('contactAlertArea');

    // EN: Front-end validation checks
    const valid = name.length>1 && message.length>4 && /^\S+@\S+\.\S+$/.test(email);
    if(valid){
      alertArea.innerHTML = '<div class="alert alert-success" role="alert">تم الإرسال بنجاح (محاكاة) — سنعاود التواصل قريباً.</div>';
      form.reset();
    }else{
      alertArea.innerHTML = '<div class="alert alert-danger" role="alert">تحقق من البيانات: الرجاء إدخال اسم وبريد ورسالة صحيحة.</div>';
    }
  });
}

// EN: Small helper to activate features when the DOM is ready
document.addEventListener('DOMContentLoaded', ()=>{
  handleContactForm();
});


// ===== Event helpers & actions (EN: buttons on event detail page) =====
function getCurrentEvent(){
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  return EVENTS.find(e => e.id === id);
}

// EN: Create .ics file content for calendar apps
function makeICS(ev){
  // Dates in UTC-ish format without TZ handling (demo purpose)
  const dt = (ev.date||'') + 'T' + ((ev.time||'00:00').replace(':','') + '00');
  const uid = ev.id + "@homs.events";
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Homs Events//EN",
    "BEGIN:VEVENT",
    "UID:" + uid,
    "DTSTAMP:" + dt,
    "DTSTART:" + dt,
    "SUMMARY:" + (ev.title||"Event"),
    "DESCRIPTION:" + (ev.long||ev.short||"") ,
    "LOCATION:" + (ev.location||"Homs"),
    "END:VEVENT",
    "END:VCALENDAR"
  ];
  return lines.join("\r\n");
}

function addToCalendar(){
  const ev = getCurrentEvent();
  if(!ev) return;
  const blob = new Blob([makeICS(ev)], {type:"text/calendar"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = (ev.title||"event") + ".ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function shareEvent(){
  const ev = getCurrentEvent();
  if(navigator.share){
    navigator.share({
      title: ev?.title || document.title,
      text: ev?.short || "Event",
      url: location.href
    }).catch(()=>{});
  }else{
    // Fallback: copy URL
    navigator.clipboard?.writeText(location.href);
    alert("تم نسخ رابط الفعالية.");
  }
}

function openDirections(){
  const ev = getCurrentEvent();
  const q = encodeURIComponent(ev?.location || "حمص, سوريا");
  window.open("https://www.google.com/maps/search/?api=1&query="+q, "_blank");
}

function setupEventButtons(){
  const r = document.getElementById('btnReserve');
  const c = document.getElementById('btnCalendar');
  const s = document.getElementById('btnShare');
  const d = document.getElementById('btnDirections');
  if(r) r.addEventListener('click', ()=> alert("تم حجزك (محاكاة). سنراسلك للتأكيد."));
  if(c) c.addEventListener('click', addToCalendar);
  if(s) s.addEventListener('click', shareEvent);
  if(d) d.addEventListener('click', openDirections);
}

// Hook into DOMContentLoaded we already use
document.addEventListener('DOMContentLoaded', setupEventButtons);
