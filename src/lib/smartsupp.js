/** Smartsupp live chat — only active on storefront routes (not /admin). */
const KEY = '066c33c30d5a0cddcfb7a8750f96fe6b77709e72';
const SCRIPT_ATTR = 'data-wme-smartsupp-loader';

let paintTimers = [];

function paintSmartsuppLauncher() {
  const container = document.getElementById('smartsupp-widget-container');
  if (!container) return;

  const buttons = container.querySelectorAll('button, [role="button"]');
  buttons.forEach((el) => {
    el.style.setProperty('background', 'linear-gradient(135deg, #E8C547 0%, #D4AF37 50%, #8B7A2E 100%)', 'important');
    el.style.setProperty('box-shadow', '0 4px 20px rgba(212, 175, 55, 0.18), 0 8px 32px rgba(0, 0, 0, 0.45)', 'important');
    el.style.setProperty('border-color', '#D4AF37', 'important');
    el.style.setProperty('color', '#050505', 'important');
  });
}

function schedulePaint() {
  // Paint a few times after Smartsupp loads — no MutationObserver needed
  paintTimers = [1000, 3000, 6000].map(ms =>
    window.setTimeout(paintSmartsuppLauncher, ms)
  );
}

function clearPaintTimers() {
  paintTimers.forEach(id => window.clearTimeout(id));
  paintTimers = [];
}

export function startSmartsuppBrandObserver() {
  schedulePaint();
}

export function stopSmartsuppBrandObserver() {
  clearPaintTimers();
}

export function ensureSmartsuppOnStorefront() {
  if (typeof document === 'undefined') return;

  window._smartsupp = window._smartsupp || {};
  window._smartsupp.key = KEY;
  window._smartsupp.color = '#D4AF37';
  
  // Natively tell Smartsupp API to elevate the widget on mobile so it clears the bottom nav (64px + 24px)
  const isMobile = window.innerWidth <= 768;
  window._smartsupp.offsetY = isMobile ? 88 : 20;

  const existingLoader = document.querySelector(`script[${SCRIPT_ATTR}]`);
  if (existingLoader) {
    schedulePaint();
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

  schedulePaint();
}

export function purgeSmartsuppFromAdminUI() {
  if (typeof document === 'undefined') return;

  clearPaintTimers();

  if (typeof window.smartsupp === 'function') {
    try {
      window.smartsupp('chat:hide');
    } catch (_) {}
  }

  // We rely on CSS body.admin-route to display: none the widget container.
  // Do NOT remove the DOM elements, as the loader script won't re-initialize them
  // when navigating back to the storefront.
}

export function maybeShowSmartsuppAfterLeavingAdmin() {
  if (typeof window.smartsupp !== 'function') return;
  try {
    window.smartsupp('chat:show');
    schedulePaint();
  } catch (_) {}
}

export function applySmartsuppBrandColorsOnLoad() {
  paintSmartsuppLauncher();
}

