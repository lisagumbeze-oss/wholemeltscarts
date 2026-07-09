/** Smartsupp live chat — only active on storefront routes (not /admin). */
const KEY = '066c33c30d5a0cddcfb7a8750f96fe6b77709e72';
const SCRIPT_ATTR = 'data-wme-smartsupp-loader';
const BRAND_COLOR = '#D4AF37';

function applySmartsuppBrandColors() {
  if (typeof window.smartsupp !== 'function') return;
  try {
    window.smartsupp('color', BRAND_COLOR);
  } catch (_) {}
}

export function ensureSmartsuppOnStorefront() {
  if (typeof document === 'undefined') return;

  window._smartsupp = window._smartsupp || {};
  window._smartsupp.key = KEY;
  window._smartsupp.widgetColor = BRAND_COLOR;

  const existingLoader = document.querySelector(`script[${SCRIPT_ATTR}]`);
  if (existingLoader) return;

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
}

/** Remove launcher, iframe widgets, and common Smartsupp UI (fixes bottom-bar/bubble on admin). */
export function purgeSmartsuppFromAdminUI() {
  if (typeof document === 'undefined') return;

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
  } catch (_) {}
}

export function applySmartsuppBrandColorsOnLoad() {
  applySmartsuppBrandColors();
}
