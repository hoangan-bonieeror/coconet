import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faBlog, faTag, faLayerGroup, faMailReply } from '@fortawesome/free-solid-svg-icons';
export interface SidebarItem {
  tittle: string,
  icon: any,
  isActive: boolean,
  endpoint: string
}

export enum SidebarMenu {
  USER = "Người dùng",
  BLOG = "Bài blog",
  TAG = "Thẻ gán",
  CATEGORY = "Phân loại",
  REQUEST = "Yêu cầu khách hàng"
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  menus : SidebarItem[] = [];
  constructor(
    private _router: Router
  ) {
    this.menus = [
        {
          tittle: SidebarMenu.USER,
          icon: faUser,
          isActive: false,
          endpoint: "admin/user"
        },
        {
          tittle: SidebarMenu.BLOG,
          icon: faBlog,
          isActive: false,
          endpoint: "admin/blog"
        },
        {
          tittle: SidebarMenu.TAG,
          icon: faTag,
          isActive: false,
          endpoint: "admin/tag"
        },
        {
          tittle: SidebarMenu.CATEGORY,
          icon: faLayerGroup,
          isActive: false,
          endpoint: "admin/category"
        },
        {
          tittle: SidebarMenu.REQUEST,
          icon: faMailReply,
          isActive: false,
          endpoint: "admin/customer-request"
        }
      ]
  }

  activeEndpoint(activateItem: SidebarItem, isNavigate: boolean = true) {
    this.menus.forEach(item => {
      item.isActive = activateItem.tittle == item.tittle
    })
    if(isNavigate) this._router.navigate([activateItem.endpoint])
  }

  findMenuItem(title: string) {
    return this.menus.find(item => item.tittle == title);
  }

}
