import { Component, OnInit } from '@angular/core';
import { CustomerRequest } from '../../../../interface/request';
import { ApiService } from '../../../../core/service/api.service';
import { AdminService, SidebarMenu } from '../../../../core/service/admin.service';

@Component({
  selector: 'app-customer-request',
  templateUrl: './customer-request.component.html',
  styleUrl: './customer-request.component.css'
})
export class CustomerRequestComponent implements OnInit {
  isDisplayDialog: boolean = false;
  // items: MenuItem[] | undefined;
  requests: CustomerRequest[] = [];
  constructor(
    private _apiService: ApiService,
    public _adminService: AdminService
  ) {}

  ngOnInit(): void {
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
