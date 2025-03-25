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
import { ProjectDetailComponent } from './child/project-detail/project-detail.component';
import { BlogComponent } from './child/blog/blog.component';
import { ContactComponent } from './child/contact/contact.component';

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
        path: 'blog',
        loadChildren: () => import('./child/blog/blog.module').then(m => m.BlogModule)
      },
      {
        path: 'service',
        component: ServiceComponent
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
      {
        path: 'gallery',
        component: ProjectDetailComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      }
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class WebRouteModule {}
