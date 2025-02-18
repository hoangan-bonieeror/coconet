import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../../../../core/service/main.service.service';

export enum Service {
  GENERAL = "Our Services", 
  ARCHITECTURAL_DESIGN = "Architectural Design",
  INTERIOR_DESIGN = "Interior Design",
  INTERIOR_CONSTRUCTION = "Interior Construction",
  FULL_SERVICE = "Full Service"
}

export interface ServiceDislay {
  label : string
  imgFileName : string,
  description: string
}
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.css',
  animations: [
    trigger("headerChange", [
      transition(':enter', [style({opacity: 0, transform: "translateY(100%)"}), animate('250ms', style({opacity: 1, transform: "translateY(0)"}))]),
      transition(':leave', [animate('250ms', style({opacity: 0}))]),
    ])
  ]
})
export class ServiceComponent implements OnInit {
  readonly Service = Service;
  constructor(
    public _mainService: MainServiceService){}

  ngOnInit(): void {
    this._mainService.exploreService(Service.GENERAL)
  }
}
