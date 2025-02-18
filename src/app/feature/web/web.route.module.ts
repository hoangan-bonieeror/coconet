import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ReadComponent } from './child/read/read.component';
import { ServiceComponent } from './child/service/service.component';
import { ShopComponent } from './child/shop/shop.component';
import { AboutComponent } from './child/about/about.component';
import { WebComponent } from './web.component';
import { HomeComponent } from './child/home/home.component';
import { ProjectComponent } from './child/project/project/project.component';
import { PagenotfoundComponent } from '../../shared/pagenotfound/pagenotfound.component';

const routes: Route[] = [
  {
    path: '',
    component: WebComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'read',
        component: ReadComponent,
      },
      {
        path: 'service',
        loadChildren: () =>
          import('./child/service/service.module').then((m) => m.ServiceModule),
      },
      {
        path: 'shop',
        component: ShopComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'project',
        component: ProjectComponent,
      },
      //Wild Card Route for 404 request
      { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class WebRouteModule {}
