import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../../../core/service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  constructor(
    public _adminService: AdminService,
    private _router: Router
  ) {}

  ngOnInit(): void {
      this._adminService.loadUsers()
  }

  navigateToCreate() {
    this._router.navigate(['admin/user/create'])
  }
}
