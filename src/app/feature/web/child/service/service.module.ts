import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './child/main/main.component';
import { ArchitecturalDesignComponent } from './child/architectural.design/architectural.design.component';
import { InteriorDesginComponent } from './child/interior.desgin/interior.desgin.component';
import { InteriorConstructionComponent } from './child/interior.construction/interior.construction.component';
import { ServiceRoutingModule } from './service.routing.module';
import { RouterOutlet } from '@angular/router';
import { ServiceComponent } from './service.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ServiceComponent,
    MainComponent,
    ArchitecturalDesignComponent,
    InteriorDesginComponent,
    InteriorConstructionComponent
  ],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    RouterOutlet,
    FontAwesomeModule,
    FormsModule
  ]
})
export class ServiceModule { }
