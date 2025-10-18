
(function () {
  const SUPPORTED = ["en", "ar"];
  const saved = localStorage.getItem("lang");
  const initial = saved || document.documentElement.lang || "ar";

  function swapBootstrapCSS(lang) {
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    const cdnLink = links.find(l => /bootstrap(\.rtl)?\.min\.css/.test(l.href));
    if (!cdnLink) return;
    const isRTL = lang === "ar";
    const newHref = cdnLink.href.replace(/bootstrap(\.rtl)?\.min\.css/, isRTL ? "bootstrap.rtl.min.css" : "bootstrap.min.css");
    if (cdnLink.href !== newHref) {
      cdnLink.href = newHref;
    }
  }

  function setDir(lang) {
    const rtl = lang === "ar";
    document.documentElement.lang = lang;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
    document.body.classList.toggle("rtl", rtl);
    swapBootstrapCSS(lang);
  }

  function t(key, lang) {
    const dict = (window.I18N && window.I18N[lang]) || {};
    if (!key) return null;
    const keys = key.split("|").map(k => k.trim());
    for (const k of keys) {
      if (k in dict) return dict[k];
    }
    return null;
  }

  function applyTranslations(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const val = t(key, lang);
      if (val != null) {
        if (el.children.length === 0) el.textContent = val;
        else el.innerHTML = val;
      }
    });

    document.querySelectorAll("[data-i18n-attrs]").forEach(el => {
      const attrs = el.getAttribute("data-i18n-attrs").split(",").map(a => a.trim());
      attrs.forEach(attr => {
        const specificKey = el.getAttribute(`data-i18n-${attr}`);
        const key = specificKey || el.getAttribute("data-i18n");
        const val = t(key, lang);
        if (val != null) el.setAttribute(attr, val);
      });
    });

    const titleEl = document.querySelector("title[data-i18n]");
    if (titleEl) {
      const titleVal = t(titleEl.getAttribute("data-i18n"), lang);
      if (titleVal) document.title = titleVal;
    }

    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
  }

  function setLanguage(lang) {
    if (!SUPPORTED.includes(lang)) return;
    localStorage.setItem("lang", lang);
    setDir(lang);
    applyTranslations(lang);
  }

  function init() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".lang-btn[data-lang]");
      if (btn) {
        e.preventDefault();
        setLanguage(btn.dataset.lang);
      }
    });
    setLanguage(SUPPORTED.includes(initial) ? initial : "ar");
  }

  // Expose helpers for other scripts (e.g., main.js)
  window.__setLanguage = setLanguage;
  window.__applyTranslations = applyTranslations;
  window.__t = (key) => t(key, document.documentElement.lang || "ar");

  document.addEventListener("DOMContentLoaded", init);
})();
