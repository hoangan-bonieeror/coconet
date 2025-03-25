import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AccordionComponent } from './accordion/accordion.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, SidebarComponent, AccordionComponent],
  imports: [
    CommonModule,
    RouterLink,
    FontAwesomeModule
  ],
  exports: [NavbarComponent, FooterComponent, SidebarComponent, AccordionComponent]
})
export class SharedModule { }
