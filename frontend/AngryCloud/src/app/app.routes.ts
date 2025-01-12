import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'folder',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./root/root.component').then((m) => m.RootComponent),
  },
  {
    path: 'folder/:folder',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./root/root.component').then((m) => m.RootComponent),
  },
];
