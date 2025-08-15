import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {
  personalInfoForm: FormGroup;
  changePwdForm: FormGroup;

  constructor(){
    this.personalInfoForm = new FormGroup({
      firstname: new FormControl(null),
      lastname: new FormControl(null)
    })

    this.changePwdForm = new FormGroup({
      currentPwd: new FormControl(null),
      newPwd: new FormControl(null),
      reEnterPwd: new FormControl(null)
    })
  }
}
