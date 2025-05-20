import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../../../../../core/service/admin.service';
import { UserInput } from '../../../../../../interface/user';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  userForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  constructor(
    private _router: Router,
    private _adminService: AdminService,
    private _messageService: MessageService
  ) {
    this.userForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      re_password: new FormControl(null, [Validators.required])
    })
  }

  async saveUser() {
    this.loading = true;
    this.submitted = true
    let username = this.userForm.get('username')?.value
    let password = this.userForm.get('password')?.value
    let re_pasword = this.userForm.get('re_password')?.value

    let isExist = this._adminService.isUsernameExist(username)
    if(isExist) {
      this.userForm.get('username')?.setErrors({ usernameExist: true })
    }
    if(password != re_pasword) {
      this.userForm.get('re_password')?.setErrors({ reEnterWrong: true })
    }

    if(this.userForm.invalid) {
      this.loading = false;
      return
    }

    let userInput: UserInput = {
      username: username,
      password: password
    }

    let response = await this._adminService.createUser(userInput)
    if(response.code == 201) {
      this._messageService.add({
        severity: 'success',
        summary: "Tao người dùng",
        detail: "Thành công"
      })

      this._router.navigate(['admin/user'])
    } else {
      this._messageService.add({
        severity: 'error',
        summary: "Tao người dùng",
        detail: "Thất bại"
      })
    }

    this.loading = false;
    this.submitted = false;
  }

  backToMain() {
    this._router.navigate(['admin/user'])
  }

  ngOnInit(): void {
      
  }
}
