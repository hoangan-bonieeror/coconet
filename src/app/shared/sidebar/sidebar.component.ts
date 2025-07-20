import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FaConfig, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightFromBracket, faBlog, faLayerGroup, faTag, faUser } from '@fortawesome/free-solid-svg-icons';
import { AdminService } from '../../core/service/admin.service';
import { LocalStorageService } from '../../core/service/localstorage.service';
import { MenuItem } from '../../config';
import { LOCALSTORAGE_KEY } from '../../config/config';


export interface SidebarItem {
  tittle: string,
  icon: any,
  isActive: boolean,
  endpoint: string
}


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  @ViewChild('burgerMenuButton') burgerButton!: ElementRef<HTMLButtonElement>;
  readonly logoutIcon = faArrowRightFromBracket;

  isShowBurgerMenu: boolean = false
  constructor(
    private _router: Router,
    public _adminService: AdminService,
    private _localStorage: LocalStorageService
  ){}

  ngOnInit(): void {
      if(this._adminService.currentUser == null) {
        let user = this._localStorage.getObject(LOCALSTORAGE_KEY.USER)
        if(user) {
          this._adminService.currentUser = user['username']
        } else {
          this._router.navigate(['login'])
        }
      }

      window.addEventListener('resize', () => {
        if(window.innerWidth > 768) {
          this.isShowBurgerMenu = false
        }
      })
  }

  onClick(itemActive: SidebarItem) {
    this._adminService.activeEndpoint(itemActive)
  }

  backToDashboard() {

  }

  onNavigate(item: SidebarItem) {
    if(this.isShowBurgerMenu) this.isShowBurgerMenu = false
    this._router.navigate([item.endpoint])
  }

  toggleMenu() {
    this.isShowBurgerMenu = !this.isShowBurgerMenu
  }

  logout() {
    this._localStorage.clear()
    this._router.navigateByUrl("/login")
  }
}

