import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./modules/auth/auth.component').then(m => m.default),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./modules/auth/pages/home/home.component')
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },

  { path: '', redirectTo: 'concreatech', pathMatch: 'full' },
  { path: '**', redirectTo: 'concreatech' }
];