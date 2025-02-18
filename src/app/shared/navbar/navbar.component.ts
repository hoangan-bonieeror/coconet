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

  readonly IconFacebook = faFacebook
  readonly IconInstagram = faInstagram;
  readonly IconPhone = faPhone;
  readonly Menu = Menu
  constructor(
    private _router: Router,
    public _mainService: MainServiceService
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    console.log(this.navbarEl.nativeElement.clientHeight)
    this._mainService.setNavbarHeight(this.navbarEl.nativeElement.clientHeight)
  }

  onNavigate(item: MenuItem) {
    this._mainService.exploreService(Service.GENERAL)
    this._mainService.activateEndpoint(item)
  }
  
}
