/**
 * Cookie consent banner + GA4 with Consent Mode v2
 * Shared by PL and EN landing pages.
 *
 * Replace G-XXXXXXXXXX with your real GA4 Measurement ID.
 */
(() => {
  const GA_ID = "G-679Z08CKLW"; // <-- UZUPELNIJ swoj GA4 Measurement ID
  const CONSENT_KEY = "tf_cookie_consent";
  const lang = document.documentElement.lang === "pl" ? "pl" : "en";

  // --- Consent Mode v2: default denied ---
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    wait_for_update: 500,
  });

  // --- Lazy-load gtag.js only when needed ---
  let gtagLoaded = false;
  function loadGtag() {
    if (gtagLoaded) return;
    gtagLoaded = true;
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);
    gtag("js", new Date());
    gtag("config", GA_ID, { anonymize_ip: true, send_page_view: true });
  }

  // --- Translations ---
  const t = lang === "pl" ? {
    text: "Ta strona korzysta z Google Analytics do analizy ruchu. Dane s\u0105 anonimowe.",
    accept: "Akceptuj\u0119",
    reject: "Odrzucam",
    privacy: "Polityka prywatno\u015bci",
    privacyHref: "./polityka-prywatnosci.html",
  } : {
    text: "This site uses Google Analytics for traffic analysis. Data is anonymized.",
    accept: "Accept",
    reject: "Reject",
    privacy: "Privacy policy",
    privacyHref: "./privacy-policy.html",
  };

  // --- Check stored preference ---
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === "granted") {
    const events = ["scroll", "click", "touchstart", "keydown"];
    const onInteraction = () => {
      loadGtag();
      grantConsent();
      events.forEach(e => window.removeEventListener(e, onInteraction));
    };
    events.forEach(e => window.addEventListener(e, onInteraction, { once: true, passive: true }));
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => { loadGtag(); grantConsent(); }, { timeout: 5000 });
    } else {
      setTimeout(() => { loadGtag(); grantConsent(); }, 5000);
    }
    return;
  }
  if (stored === "denied") {
    return; // stays denied, no banner
  }

  // --- Build banner ---
  const banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-label", lang === "pl" ? "Baner cookie" : "Cookie banner");
  banner.innerHTML = `
    <p class="cookie-text">
      ${t.text}
      <a href="${t.privacyHref}" class="cookie-link">${t.privacy}</a>
    </p>
    <div class="cookie-actions">
      <button type="button" class="cookie-btn cookie-btn-accept">${t.accept}</button>
      <button type="button" class="cookie-btn cookie-btn-reject">${t.reject}</button>
    </div>
  `;

  const showBanner = () => {
    document.body.appendChild(banner);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        banner.classList.add("is-visible");
      });
    });
  };

  const hideBanner = () => {
    banner.classList.remove("is-visible");
    banner.addEventListener("transitionend", () => banner.remove(), { once: true });
    // Fallback if no transition fires
    setTimeout(() => { if (banner.parentNode) banner.remove(); }, 500);
  };

  banner.querySelector(".cookie-btn-accept").addEventListener("click", () => {
    localStorage.setItem(CONSENT_KEY, "granted");
    grantConsent();
    hideBanner();
  });

  banner.querySelector(".cookie-btn-reject").addEventListener("click", () => {
    localStorage.setItem(CONSENT_KEY, "denied");
    hideBanner();
  });

  // Show after short delay so it doesn't flash on load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(showBanner, 800));
  } else {
    setTimeout(showBanner, 800);
  }

  function grantConsent() {
    loadGtag();
    gtag("consent", "update", {
      analytics_storage: "granted",
    });
  }
})();
