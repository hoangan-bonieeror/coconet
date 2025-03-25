import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebRouteModule } from './web.route.module';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { WebComponent } from './web.component';
import { HomeComponent } from './child/home/home.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroArrowLeft, heroArrowRight, heroXMark } from '@ng-icons/heroicons/outline'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from '../../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectComponent } from './child/project/project/project.component';
import { ProjectDetailComponent } from './child/project-detail/project-detail.component';
import { ServiceComponent } from './child/service/service.component';
import { BlogComponent } from './child/blog/blog.component';
import { ContactComponent } from './child/contact/contact.component';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    WebComponent,
    HomeComponent,
    ProjectComponent,
    ProjectDetailComponent,
    ServiceComponent,
    BlogComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    WebRouteModule,
    RouterOutlet,
    SharedModule,
    NgIconsModule.withIcons({
      heroArrowLeft, heroArrowRight, heroXMark
    }),
    FontAwesomeModule,
    CoreModule,
    FormsModule,
    DividerModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
    CheckboxModule,
    ReactiveFormsModule,
    InputMaskModule,
    ButtonModule,
    ToastModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebModule { }
