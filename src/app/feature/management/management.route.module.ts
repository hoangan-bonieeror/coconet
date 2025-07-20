import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { TagComponent } from './child/tag/tag.component';
import { CategoryComponent } from './child/category/category.component';
import { BlogComponent } from './child/blog/blog.component';
import { UserComponent } from './child/user/user.component';
import { ManagementComponent } from './management.component';
import { CustomerRequestComponent } from './child/customer-request/customer-request.component';
import { adminGuard } from '../../core/guard/admin.guard';
import { UserModule } from './child/user/user.module';
import { DashboardComponent } from './child/dashboard/dashboard.component';
import { SettingComponent } from './child/setting/setting.component';

const routes : Route[] = [
  {
    path: "",
    component: ManagementComponent,
    children: [
      {
        path: "setting",
        component: SettingComponent,
        canActivate: [adminGuard]
      },
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [adminGuard]
      },
      {
        path: "tag",
        component: TagComponent,
        canActivate: [adminGuard]
      },
      {
        path: "category",
        component: CategoryComponent,
        canActivate: [adminGuard]
      },
      {
        path: "blog",
        loadChildren: () => import('./child/blog/blog.module').then(m => m.BlogModule),
        canActivate: [adminGuard]
      },
      {
        path: "user",
        loadChildren: () => import('./child/user/user.module').then(m => UserModule),
        canActivate: [adminGuard]
      },
      {
        path: "customer-request",
        component: CustomerRequestComponent,
        canActivate: [adminGuard]
      }
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
export class ManagementRouteModule { }
