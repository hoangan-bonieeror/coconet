import { Component, OnInit } from '@angular/core';
import { CustomerRequest } from '../../../../interface/request';
import { ApiService } from '../../../../core/service/api.service';
import { AdminService, SidebarMenu } from '../../../../core/service/admin.service';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customer-request',
  templateUrl: './customer-request.component.html',
  styleUrl: './customer-request.component.css'
})
export class CustomerRequestComponent implements OnInit {
  readonly InfoIcon = faCircleInfo;
  isDisplayDialog: boolean = false;
  // items: MenuItem[] | undefined;
  requests: CustomerRequest[] = [];
  constructor(
    private _apiService: ApiService,
    public _adminService: AdminService
  ) {}

  ngOnInit(): void {
      let foundMenu = this._adminService.menus.find(o=>o.tittle==SidebarMenu.REQUEST)
      if(foundMenu) {
        this._adminService.activeEndpoint(foundMenu)
      }
      this._apiService.getAllRequests().subscribe(res => {
        if(res.ok) {
          let data = res.body as CustomerRequest[]
          this.requests = data
        }
      })

      let foundMenuItem = this._adminService.findMenuItem(SidebarMenu.REQUEST)
      if(foundMenuItem) this._adminService.activeEndpoint(foundMenuItem, false)
  }
}
