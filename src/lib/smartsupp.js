/** Smartsupp live chat — only active on storefront routes (not /admin). */
const KEY = '066c33c30d5a0cddcfb7a8750f96fe6b77709e72';
const SCRIPT_ATTR = 'data-wme-smartsupp-loader';
const BRAND_COLOR = '#D4AF37';
const BRAND_GRADIENT = 'linear-gradient(135deg, #E8C547 0%, #D4AF37 50%, #8B7A2E 100%)';
const BRAND_SHADOW = '0 4px 20px rgba(212, 175, 55, 0.18), 0 8px 32px rgba(0, 0, 0, 0.45)';

let brandObserver = null;

function applySmartsuppBrandColors() {
  if (typeof window.smartsupp === 'function') {
    try {
      window.smartsupp('color', BRAND_COLOR);
    } catch (_) {}
  }
}

function isSmartsuppLauncher(el) {
  if (el.closest('iframe')) return false;

  const rect = el.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return false;

  const compactLauncher = rect.width <= 200 && rect.height <= 80;
  const bottomRight =
    rect.bottom > window.innerHeight - 110 && rect.right > window.innerWidth - 220;

  return (
    el.tagName === 'BUTTON' ||
    el.getAttribute('role') === 'button' ||
    /launcher|bubble|widget-button|chat-button|ss-widget/i.test(el.className) ||
    (compactLauncher && bottomRight)
  );
}

function paintSmartsuppLauncher(root = document) {
  const selectors = [
    '#smartsupp-widget-container button',
    '#smartsupp-widget-container a[role="button"]',
    '#smartsupp-widget-container [class*="launcher"]',
    '#smartsupp-widget-container [class*="bubble"]',
    '#smartsupp-widget-container [class*="widget-button"]',
    '[id^="smartsupp"] button',
    '[class*="smartsupp"] button',
  ].join(',');

  root.querySelectorAll(selectors).forEach((el) => {
    if (!isSmartsuppLauncher(el)) return;

    el.style.setProperty('background', BRAND_GRADIENT, 'important');
    el.style.setProperty('background-color', BRAND_COLOR, 'important');
    el.style.setProperty('box-shadow', BRAND_SHADOW, 'important');
    el.style.setProperty('border-color', BRAND_COLOR, 'important');
    el.style.setProperty('color', '#050505', 'important');
  });

  const container = document.getElementById('smartsupp-widget-container');
  container?.querySelectorAll(':scope > div').forEach((el) => {
    if (!isSmartsuppLauncher(el)) return;
    el.style.setProperty('background', BRAND_GRADIENT, 'important');
    el.style.setProperty('background-color', BRAND_COLOR, 'important');
    el.style.setProperty('box-shadow', BRAND_SHADOW, 'important');
    el.style.setProperty('border-color', BRAND_COLOR, 'important');
    el.style.setProperty('color', '#050505', 'important');
  });
}

export function startSmartsuppBrandObserver() {
  if (typeof document === 'undefined' || brandObserver) return;

  const paint = () => {
    applySmartsuppBrandColors();
    paintSmartsuppLauncher();
  };

  paint();
  brandObserver = new MutationObserver(paint);
  brandObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class'],
  });

  window.setTimeout(paint, 500);
  window.setTimeout(paint, 1500);
  window.setTimeout(paint, 3000);
}

export function stopSmartsuppBrandObserver() {
  brandObserver?.disconnect();
  brandObserver = null;
}

export function ensureSmartsuppOnStorefront() {
  if (typeof document === 'undefined') return;

  window._smartsupp = window._smartsupp || {};
  window._smartsupp.key = KEY;
  window._smartsupp.color = BRAND_COLOR;

  const existingLoader = document.querySelector(`script[${SCRIPT_ATTR}]`);
  if (existingLoader) {
    startSmartsuppBrandObserver();
    return;
  }

  (function (d) {
    var s,
      c,
      o = (window.smartsupp = function () {
        o._.push(arguments);
      });
    o._ = [];
    s = d.getElementsByTagName('script')[0];
    c = d.createElement('script');
    c.type = 'text/javascript';
    c.charset = 'utf-8';
    c.async = true;
    c.src = 'https://www.smartsuppchat.com/loader.js?';
    c.setAttribute(SCRIPT_ATTR, '');
    s.parentNode.insertBefore(c, s);
  })(document);

  startSmartsuppBrandObserver();
}

/** Remove launcher, iframe widgets, and common Smartsupp UI (fixes bottom-bar/bubble on admin). */
export function purgeSmartsuppFromAdminUI() {
  if (typeof document === 'undefined') return;

  stopSmartsuppBrandObserver();

  if (typeof window.smartsupp === 'function') {
    try {
      window.smartsupp('chat:hide');
    } catch (_) {}
  }

  const sel = [
    '#smartsupp-widget-container',
    '[id^="smartsupp"]',
    '[class*="smartsupp"]',
    'iframe[src*="smartsupp"]',
    'iframe[src*="smartsuppchat"]',
    'iframe[name^="smartsupp"]',
  ].join(',');

  document.querySelectorAll(sel).forEach((el) => el.remove());
}

export function maybeShowSmartsuppAfterLeavingAdmin() {
  if (typeof window.smartsupp !== 'function') return;
  try {
    applySmartsuppBrandColors();
    window.smartsupp('chat:show');
    paintSmartsuppLauncher();
  } catch (_) {}
}

export function applySmartsuppBrandColorsOnLoad() {
  applySmartsuppBrandColors();
  paintSmartsuppLauncher();
}
