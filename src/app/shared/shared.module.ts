import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AccordionComponent } from './accordion/accordion.component';
import { DrawerModule } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, SidebarComponent, AccordionComponent],
  imports: [
    CommonModule,
    RouterLink,
    FontAwesomeModule,
    DrawerModule,
    InputTextModule
  ],
  exports: [NavbarComponent, FooterComponent, SidebarComponent, AccordionComponent]
})
export class SharedModule { }
