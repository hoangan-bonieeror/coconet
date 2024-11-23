import { Component, OnInit } from '@angular/core';
import { Menu } from '../../config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  readonly Menu = Menu
  menuItem : { title: string, isActive: boolean, routerLink: string }[] = []
  ngOnInit(): void {
      for(const [key, value] of Object.entries(this.Menu)) {
        this.menuItem.push({
          title: value,
          isActive: false,
          routerLink: '/web/' + (value as string).toLowerCase()
        })
      }
  }
}
