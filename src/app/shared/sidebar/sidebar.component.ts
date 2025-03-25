import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FaConfig, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightFromBracket, faBlog, faLayerGroup, faTag, faUser } from '@fortawesome/free-solid-svg-icons';
import { AdminService } from '../../core/service/admin.service';
import { LocalStorageService } from '../../core/service/localstorage.service';


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
export class SidebarComponent {
  readonly logoutIcon = faArrowRightFromBracket;
  constructor(
    private _router: Router,
    public _adminService: AdminService,
    private _localStorage: LocalStorageService
  ){}
  onClick(itemActive: SidebarItem) {
    this._adminService.activeEndpoint(itemActive)
  }

  backToDashboard() {

  }

  logout() {
    this._localStorage.clear()
    this._router.navigateByUrl("/login")
  }
}
