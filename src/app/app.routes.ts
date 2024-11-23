import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'web',
        loadChildren: () => import('./feature/web/web.module').then(m => m.WebModule)
    },
    {
        path: 'admin',
        loadChildren: () => import('./feature/management/management.module').then(m => m.ManagementModule)
    }
];

