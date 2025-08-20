import { Component, OnInit } from '@angular/core';
import { NavPostion } from '../../../../interface/common';
import { MainServiceService } from '../../../../core/service/main.service.service';

@Component({
  selector: 'app-read',
  standalone: true,
  imports: [],
  templateUrl: './read.component.html',
  styleUrl: './read.component.css'
})
export class ReadComponent implements OnInit {
  constructor(
    private _mainService: MainServiceService
  ) {}

  ngOnInit(): void {
    this._mainService.setNavBarPosition(NavPostion.STICKY)
  }
}
