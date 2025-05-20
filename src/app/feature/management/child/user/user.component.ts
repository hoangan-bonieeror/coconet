import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/service/api.service';
import { AdminService } from '../../../../core/service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  constructor(
    private _router: Router
  ) {}

  navigateToCreate() {
    this._router.navigate(['admin/user/create'])
  }
}
