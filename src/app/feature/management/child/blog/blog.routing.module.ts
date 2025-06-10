import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';
import { MainComponent } from './child/main/main.component';
import { CreateBlogComponent } from './child/create-blog/create-blog.component';
import { UpdateBlogComponent } from './child/update-blog/update-blog.component';

const routes : Route[] = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: "",
        component: MainComponent
      },
      {
        path: "new",
        component: CreateBlogComponent
      },
      {
        path: "edit/:id",
        component: UpdateBlogComponent
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
export class BlogRoutingModule { }
  