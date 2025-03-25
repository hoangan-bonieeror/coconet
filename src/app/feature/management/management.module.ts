import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementRouteModule } from './management.route.module';
import { TagComponent } from './child/tag/tag.component';
import { CategoryComponent } from './child/category/category.component';
import { UserComponent } from './child/user/user.component';
import { BlogComponent } from './child/blog/blog.component';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterOutlet } from '@angular/router';
import { ManagementComponent } from './management.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { CustomerRequestComponent } from './child/customer-request/customer-request.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
@NgModule({
  declarations: [
    TagComponent,
    UserComponent,
    CategoryComponent,
    ManagementComponent,
    CustomerRequestComponent
  ],
  imports: [
    CommonModule,
    ManagementRouteModule,
    CoreModule,
    SharedModule,
    RouterOutlet,
    TableModule,
    InputTextModule,
    FormsModule,
    DatePickerModule,
    ButtonModule,
    InputGroupAddonModule,
    InputGroupModule,
    TieredMenuModule,
    SelectModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BadgeModule,
    OverlayBadgeModule
  ]
})
export class ManagementModule { }
