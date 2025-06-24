import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faBlog, faTag, faLayerGroup, faMailReply, faDashboard } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primeng/api';
import { User, UserInput } from '../../interface/user';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse } from '../../interface/api_message';
import { PostInput } from '../../interface/post';
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
  REQUEST = "Yêu cầu khách hàng",
  DASHBOARD = "Bảng điều khiển"
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  menus : SidebarItem[] = [];
  breadcrumbItems : MenuItem[];

  private _users: BehaviorSubject<User[]>;
  public users: Observable<User[]>;

  
  
  constructor(
    private _router: Router,
    private _apiService: ApiService
  ) {
    this.menus = [
        {
          tittle: SidebarMenu.DASHBOARD,
          icon: faDashboard,
          isActive: false,
          endpoint: "admin/dashboard"
        },
        // {
        //   tittle: SidebarMenu.USER,
        //   icon: faUser,
        //   isActive: false,
        //   endpoint: "admin/user"
        // },
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

    this.breadcrumbItems = [];
    this._users = new BehaviorSubject<User[]>([])
    this.users = this._users.asObservable()
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


  loadUsers() {
    this._apiService.getAllUsers().subscribe(res => {
      if(res.ok) {
        this._users.next([])
        const data = res.body as User[];
        this._users.next(data)
      }
    })
  }

  async createUser(input: UserInput) {
    let observe = this._apiService.createUser(input)
    let response = await lastValueFrom(observe)
    let apiResponse : ApiResponse = {
      code: response.status,
      msg: ''
    }
    return apiResponse
  }

  async createPost(postInput: FormData) {
    let observe = this._apiService.createPost(postInput)
    let response = await lastValueFrom(observe)
    let apiResponse : ApiResponse = {
      code: response.status,
      msg: ''
    }
    return apiResponse
  }

  isUsernameExist(username: string) {
    return this._users.value.find(o=>o.username == username) != undefined
  }
  
}
