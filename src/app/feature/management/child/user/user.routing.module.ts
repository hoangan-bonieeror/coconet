import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { MainComponent } from './child/main/main.component';
import { CreateComponent } from './child/create/create.component';

const routes : Route[] = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: MainComponent
      },
      {
        path: 'create',
        component: CreateComponent
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
export class UserRoutingModule { }
