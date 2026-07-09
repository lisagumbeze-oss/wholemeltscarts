import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {
  ensureSmartsuppOnStorefront,
  purgeSmartsuppFromAdminUI,
  maybeShowSmartsuppAfterLeavingAdmin,
  applySmartsuppBrandColorsOnLoad,
} from '../lib/smartsupp';

export default function AppRoot() {
  const { pathname } = useLocation();

  useEffect(() => {
    const isAdmin = pathname.startsWith('/admin');
    document.body.classList.toggle('admin-route', isAdmin);

    if (isAdmin) {
      purgeSmartsuppFromAdminUI();
      return;
    }

    ensureSmartsuppOnStorefront();
    maybeShowSmartsuppAfterLeavingAdmin();

    const colorTimer = window.setInterval(() => {
      applySmartsuppBrandColorsOnLoad();
    }, 500);
    const stopColorTimer = window.setTimeout(() => window.clearInterval(colorTimer), 10000);

    return () => {
      window.clearInterval(colorTimer);
      window.clearTimeout(stopColorTimer);
    };
  }, [pathname]);

  return <Outlet />;
}
