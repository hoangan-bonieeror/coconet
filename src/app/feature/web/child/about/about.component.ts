import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../../../../core/service/main.service.service';
import { NavPostion } from '../../../../interface/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  constructor(
    public _mainService: MainServiceService
  ){}

  ngOnInit(): void {
    this._mainService.setNavBarPosition(NavPostion.FIXED)
  }
}
