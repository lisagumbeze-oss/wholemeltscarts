import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {
  ensureSmartsuppOnStorefront,
  purgeSmartsuppFromAdminUI,
  maybeShowSmartsuppAfterLeavingAdmin,
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
  }, [pathname]);

  return <Outlet />;
}
