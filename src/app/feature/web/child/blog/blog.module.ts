import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './child/category/category.component';
import { MainComponent } from './child/main/main.component';
import { TagComponent } from './child/tag/tag.component';
import { PostComponent } from './component/post/post.component';
import { SidebarContentComponent } from './component/sidebar-content/sidebar-content.component';
import { BlogRoutingModule } from './blog.routing.module';
import { RouterOutlet } from '@angular/router';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    CategoryComponent,
    MainComponent,
    TagComponent,
    PostComponent,
    SidebarContentComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    RouterOutlet,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    InputGroupModule,
    TableModule
  ]
})
export class BlogModule { }
