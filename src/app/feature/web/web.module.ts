import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebRouteModule } from './web.route.module';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { WebComponent } from './web.component';
import { HomeComponent } from './child/home/home.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroArrowLeft, heroArrowRight } from '@ng-icons/heroicons/outline'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from '../../core/core.module';
import { FormsModule } from '@angular/forms';
import { ProjectComponent } from './child/project/project/project.component';
@NgModule({
  declarations: [
    WebComponent,
    HomeComponent,
    ProjectComponent
  ],
  imports: [
    CommonModule,
    WebRouteModule,
    RouterOutlet,
    SharedModule,
    NgIconsModule.withIcons({
      heroArrowLeft, heroArrowRight
    }),
    FontAwesomeModule,
    CoreModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebModule { }
