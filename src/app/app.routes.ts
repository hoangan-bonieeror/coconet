import { Routes } from '@angular/router';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./feature/web/web.module').then(m => m.WebModule)
    },
    {
        path: 'admin',
        loadChildren: () => import('./feature/management/management.module').then(m => m.ManagementModule)
    },
];

