import { Injectable } from '@angular/core';
import { Service } from '../../feature/web/child/service/service.component';
import { Menu } from '../../config';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

export interface MenuItem {
  title: string,
  isActive: boolean,
  routerLink: string
}

@Injectable({
  providedIn: null
})
export class MainServiceService {
  currentService: Service = Service.GENERAL;
  menu : MenuItem[] = [];

  // Scroll
  scrollPosition : number = 0;
  // Navbar Height
  navbarHeight: number = 0;
  
  constructor(
    private _router: Router,
    private _viewportScroller: ViewportScroller
  ) {
    for(const [key, value] of Object.entries(Menu)) {
      this.menu.push({
        title: value,
        isActive: false,
        routerLink: '/' + (value as string).toLowerCase()
      })
    }

    window.onscroll = () => {
      this.setScrollPosition()
    }
  }

  setScrollPosition() {
    let [x, y] = this._viewportScroller.getScrollPosition()
    this.scrollPosition = y
  }

  // Menu Manage Section
  activateEndpoint(activateItem: MenuItem, isNavigate: boolean = true) {
    this.menu.forEach(item => {
      item.isActive = item.title == activateItem.title
    })

    if(isNavigate) {
      this._router.navigate([activateItem.routerLink])
    }
  }
  findMenuItem(title: string) {
    return this.menu.find(item => item.title == title);
  }

  // Service Selection
  exploreService(service: Service) {
    this.currentService = service
    this._viewportScroller.scrollToPosition([0, 0])
  }

  // Navigation bar
  setNavbarHeight(height: number) {
    this.navbarHeight = height
  }
  getNavbarHeight() {
    return this.navbarHeight;
  }
}
