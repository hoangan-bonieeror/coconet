import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';
import { TagComponent } from './child/tag/tag.component';
import { PostComponent } from './component/post/post.component';
import { MainComponent } from './child/main/main.component';
import { CategoryComponent } from './child/category/category.component';


const routes : Route[] = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: 'tag',
        component: TagComponent
      },
      {
        path: 'post',
        component: PostComponent
      },
      {
        path: '',
        component: MainComponent
      },
      {
        path: 'category',
        component: CategoryComponent
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
export class BlogRoutingModule { }
