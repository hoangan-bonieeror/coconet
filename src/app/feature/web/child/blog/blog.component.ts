import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../../../../core/service/main.service.service';
import { NavPostion } from '../../../../interface/common';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  constructor(
    private _mainService: MainServiceService
  ) {}

  ngOnInit(): void {
    this._mainService.setNavBarPosition(NavPostion.STICKY)
  }
}
