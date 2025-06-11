import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog.routing.module';
import { BlogComponent } from './blog.component';
import { CreateBlogComponent } from './child/create-blog/create-blog.component';
import { UpdateBlogComponent } from './child/update-blog/update-blog.component';
import { MainComponent } from './child/main/main.component';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { EditorModule } from 'primeng/editor';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { DragDropDirective } from '../../../../core/directive/drag-drop.directive';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@NgModule({
  declarations: [
    BlogComponent,
    CreateBlogComponent,
    UpdateBlogComponent,
    MainComponent,    
    DragDropDirective
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    RouterOutlet,
    ButtonModule,
    TableModule,
    InputTextModule,
    SelectModule,
    TextareaModule,
    EditorModule,
    ReactiveFormsModule,
    MultiSelectModule,
    DialogModule,
    FileUploadModule,
    ConfirmDialogModule
  ],
  providers: [
  ]
})
export class BlogModule { }
