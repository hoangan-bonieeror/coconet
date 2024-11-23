import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ReadComponent } from './child/read/read.component';
import { ServiceComponent } from './child/service/service.component';
import { ShopComponent } from './child/shop/shop.component';
import { AboutComponent } from './child/about/about.component';
import { WebComponent } from './web.component';
import { HomeComponent } from './child/home/home.component';

const routes : Route[] = [
  {
    path: '',
    component: WebComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'read',
        component: ReadComponent
      },
      {
        path: 'service',
        component: ServiceComponent
      },
      {
        path: 'shop',
        component: ShopComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class WebRouteModule { }
