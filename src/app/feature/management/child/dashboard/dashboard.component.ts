import { Component, OnInit } from '@angular/core';
import { AdminService, SidebarItem, SidebarMenu } from '../../../../core/service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(
    private _adminService: AdminService,
    private _router: Router
  ){}

  ngOnInit(): void {
    let foundMenu = this._adminService.menus.find(o=>o.tittle==SidebarMenu.DASHBOARD)
    if(foundMenu) {
      this._adminService.activeEndpoint(foundMenu)
    }
  }

  onClick(item: SidebarItem) {
    this._router.navigate([item.endpoint])
    this._adminService.activeEndpoint(item)
  }

  processMenu() {
    return this._adminService.menus.filter(o=>o.tittle != SidebarMenu.DASHBOARD)
  }
}
