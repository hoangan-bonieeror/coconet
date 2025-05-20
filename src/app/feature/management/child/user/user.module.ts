import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user.routing.module';
import { TableModule } from 'primeng/table';
import { UserComponent } from './user.component';
import { CreateComponent } from './child/create/create.component';
import { MainComponent } from './child/main/main.component';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  declarations: [
    UserComponent,
    CreateComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    TableModule,
    RouterOutlet,
    FormsModule,
    PasswordModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule
  ]
})
export class UserModule { }
