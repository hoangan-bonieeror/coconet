import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ApiService } from '../../core/service/api.service';
import { UserLogin } from '../../interface/user';
import { LocalStorageService } from '../../core/service/localstorage.service';
import { LOCALSTORAGE_KEY, SESSION_STORAGE_KEY } from '../../config/config';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../core/service/session-storage.service';
import { CoreModule } from '../../core/core.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    CoreModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loading: boolean;
  submit: boolean;
  loginForm: FormGroup;
  constructor(
    private _apiService: ApiService,
    private _localStorage: LocalStorageService,
    private _router: Router,
    private _sessionStorage: SessionStorageService
  ) {
    this.loading = false;
    this.submit = false;
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    })
  }

  login() {
    this.submit = true
    this.loading = true
    if(this.loginForm.invalid) {
      this.loading = false
      return
    }
    const username = this.loginForm.get("username")?.value
    const password = this.loginForm.get('password')?.value
    let userLogin : UserLogin = {
      username: username,
      password: password
    }
    this._apiService.login(userLogin).subscribe(response => {
      if(response.ok) {
        let bodyResponse = response.body
        let token = (bodyResponse !== null && "token" in bodyResponse) ? bodyResponse["token"] as string : null
        let user = (bodyResponse !== null && "user" in bodyResponse) ? bodyResponse["user"] as Object : null
        if(token) {
          this._localStorage.set(LOCALSTORAGE_KEY.TOKEN, token)
          this._localStorage.setObject(LOCALSTORAGE_KEY.USER, user)
          let current_page = this._sessionStorage.get(SESSION_STORAGE_KEY.CURRENT_PAGE)
          if(current_page) {
            this._router.navigate([current_page])
          } else {
            const defaultPage = "admin/dashboard"
            this._router.navigate([defaultPage])            
          }
        }
        
      }

      
      this.loading = false
    })
  }

}
