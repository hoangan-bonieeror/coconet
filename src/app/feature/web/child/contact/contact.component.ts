import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MainServiceService } from '../../../../core/service/main.service.service';
import { Menu } from '../../../../config';
import { Service } from '../service/service.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../core/service/api.service';
import { CustomerRequest, CustomerRequestInput } from '../../../../interface/request';
import { MessageService } from 'primeng/api';

import '@maptiler/sdk/dist/maptiler-sdk.css';
import { faMapMarker, faPhone, faVoicemail } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly MarkerIcon = faMapMarker;
  readonly EmailIcon = faVoicemail;
  readonly PhoneIcon = faPhone;
  readonly FacebookIcon = faFacebook;
  readonly InstagramIcon = faInstagram;
  serviceOptions: string[] = [];
  formContact: FormGroup;
  submit: boolean;
  loading: boolean;

  @ViewChild('map') mapContainer!: ElementRef<HTMLElement>;
  constructor(
    private _mainService: MainServiceService,
    private _apiService: ApiService,
    private _messageService: MessageService
  ) {
    this.formContact = new FormGroup({
      projectName: new FormControl(""),
      projectArea: new FormControl(""),
      completionTime: new FormControl(""),
      maxEstimatedPrice: new FormControl(100000000),
      minEstimatedPrice: new FormControl(0),
      selectedService: new FormControl(Service.DESIGN),
      customerFullname: new FormControl(""),
      customerPhone: new FormControl(""),
      customerEmail: new FormControl("", [
        Validators.email
      ])
    })
    this.submit = false
    this.loading = false
  }
  ngOnInit(): void {
    let contactMenuItem = this._mainService.findMenuItem(Menu.CONTACT)
    if(contactMenuItem) this._mainService.activateEndpoint(contactMenuItem)

    this.serviceOptions = [
      Service.DESIGN,
      Service.CONSTRUCTION,
      Service.RENOVATION
    ]
  }

  ngAfterViewInit(): void {}

  ngOnDestroy() {}

  sendReuquest() {
    this.submit = true
    this.loading = true
    if(this.formContact.invalid) {
      setTimeout(() => {
        this.loading = true
      }, 2000)
      return
    }

    let projectName = this.formContact.get("projectName")?.value
    let projectArea = this.formContact.get("projectArea")?.value
    let completionTime = this.formContact.get("completionTime")?.value
    let maxEstimatedPrice = this.formContact.get("maxEstimatedPrice")?.value
    let minEstimatedPrice = this.formContact.get("minEstimatedPrice")?.value
    let selectedService = this.formContact.get("selectedService")?.value
    let customerFullname = this.formContact.get("customerFullname")?.value
    let customerPhone = this.formContact.get("customerPhone")?.value
    let customerEmail = this.formContact.get("customerEmail")?.value

    let customerRequest : CustomerRequestInput = {
      projectName,
      projectArea,
      completionTime,
      maxEstimatedPrice,
      minEstimatedPrice,
      selectedService,
      customerFullname,
      customerPhone,
      customerEmail
    }
    this._apiService.sendRequest(customerRequest).subscribe(res => {
      if(res.ok) {
        setTimeout(() => {
          this._messageService.add({
            severity: "success",
            summary: "Kết quả gửi yêu cầu",
            detail: "Gửi thành công",
            life: 3000
          })
          this.formContact.get("projectName")?.setValue("")
          this.formContact.get("projectArea")?.setValue("")
          this.formContact.get("completionTime")?.setValue("")
          this.formContact.get("maxEstimatedPrice")?.setValue(100000000)
          this.formContact.get("minEstimatedPrice")?.setValue(0)
          this.formContact.get("selectedService")?.setValue(Service.DESIGN)
          this.formContact.get("customerFullname")?.setValue("")
          this.formContact.get("customerPhone")?.setValue("")
          this.formContact.get("customerEmail")?.setValue("")
          this.submit = false
          this.loading = false
        }, 2000)
      } else {
        setTimeout(() => {
          this._messageService.add({
            severity: "warn",
            summary: "Kết quả gửi yêu cầu",
            detail: "Gửi thất bại",
            life: 3000
          })
          this.loading = false
        })
      }
    })
  }
}
