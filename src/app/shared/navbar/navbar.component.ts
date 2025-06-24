import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Menu } from '../../config';
import { Router } from '@angular/router';
import { MainServiceService } from '../../core/service/main.service.service';
import { Service } from '../../feature/web/child/service/service.component';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

export interface MenuItem {
  title: string,
  isActive: boolean,
  routerLink: string
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild('navbar') navbarEl!: ElementRef<HTMLDivElement>;
  @ViewChild('burgerMenuButton') burgerButton!: ElementRef<HTMLButtonElement>;
  readonly IconFacebook = faFacebook
  readonly IconInstagram = faInstagram;
  readonly IconPhone = faPhone;
  readonly Menu = Menu
  isShowBurgerMenu: boolean = false
  constructor(
    private _router: Router,
    public _mainService: MainServiceService
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    window.onresize = () => {
      this._mainService.setNavbarHeight(this.navbarEl.nativeElement.clientHeight)
    }
    this._mainService.setNavbarHeight(this.navbarEl.nativeElement.clientHeight)
  }

  onNavigate(item: MenuItem) {
    if(this.isShowBurgerMenu) this.isShowBurgerMenu = false
    this._mainService.exploreService(Service.GENERAL)
    this._mainService.activateEndpoint(item)
  }
  
  toggleMenu() {
    if(this.burgerButton) {
      const isActive = this.burgerButton.nativeElement.classList.toggle('active');
      this.burgerButton.nativeElement.setAttribute('aria-expanded', isActive + '');
      this.isShowBurgerMenu = isActive
    }
  }

  headToAdmin() {
    this._router.navigate(['admin/dashboard'])
  }
}
