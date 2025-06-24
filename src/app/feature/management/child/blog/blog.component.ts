import { Component, OnInit } from '@angular/core';
import { AdminService, SidebarMenu } from '../../../../core/service/admin.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  constructor(
    private _adminService: AdminService
  ){}
  ngOnInit(): void {
    let foundMenu = this._adminService.menus.find(o=>o.tittle==SidebarMenu.BLOG)
    if(foundMenu) {
      this._adminService.activeEndpoint(foundMenu)
    }
  }
}
