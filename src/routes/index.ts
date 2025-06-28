import { lazy } from 'react';

interface Router {
  path: string;
  component: React.ComponentType;
}

export const routes: Router[] = [
  {
    path: '/',
    component: lazy(() => import('../components/pages/home-page')),
  },
  {
    path: '*',
    component: lazy(() => import('../components/pages/error-page')),
  },
];
