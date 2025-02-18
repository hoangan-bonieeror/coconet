import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { MainComponent } from './child/main/main.component';
import { ArchitecturalDesignComponent } from './child/architectural.design/architectural.design.component';
import { InteriorDesginComponent } from './child/interior.desgin/interior.desgin.component';
import { ServiceComponent } from './service.component';
import { InteriorConstructionComponent } from './child/interior.construction/interior.construction.component';
import { FullServiceComponent } from './child/full.service/full.service.component';

const routes : Route[] = [
  {
    path: '',
    component: ServiceComponent,
    children: [
      {
        path: '',
        component: MainComponent
      },
      {
        path: 'architectural-design',
        component: ArchitecturalDesignComponent
      },
      {
        path: 'interior-design',
        component: InteriorDesginComponent
      },
      {
        path: 'interior-construction',
        component: InteriorConstructionComponent
      },
      {
        path: 'full-service',
        component: FullServiceComponent
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
export class ServiceRoutingModule { }
