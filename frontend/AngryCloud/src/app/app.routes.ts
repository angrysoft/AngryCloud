import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { FileBrowserComponent } from './components/file-browser/file-browser.component';

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
    children: [
      {
        path: '',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./components/file-browser/file-browser.component').then(
            (m) => FileBrowserComponent
          ),
      },
      {
        path: ':folder',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./components/file-browser/file-browser.component').then(
            (m) => FileBrowserComponent
          ),
      },
    ],
  },
];
