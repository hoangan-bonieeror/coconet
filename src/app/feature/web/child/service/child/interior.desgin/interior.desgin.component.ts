import { Component } from '@angular/core';
import { MainServiceService } from '../../../../../../core/service/main.service.service';
import { Service } from '../../service.component';
import { Menu } from '../../../../../../config';

@Component({
  selector: 'app-interior.desgin',
  templateUrl: './interior.desgin.component.html',
  styleUrl: './interior.desgin.component.css'
})
export class InteriorDesginComponent {
  constructor(private _mainService: MainServiceService) {
    this._mainService.exploreService(Service.INTERIOR_DESIGN)
    let item = this._mainService.findMenuItem(Menu.SERVICE);
    if(item) this._mainService.activateEndpoint(item, false)
  }
}
