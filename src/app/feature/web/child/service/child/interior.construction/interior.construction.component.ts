import { Component } from '@angular/core';
import { MainServiceService } from '../../../../../../core/service/main.service.service';
import { Service } from '../../service.component';
import { Menu } from '../../../../../../config';

@Component({
  selector: 'app-interior.construction',
  templateUrl: './interior.construction.component.html',
  styleUrl: './interior.construction.component.css'
})
export class InteriorConstructionComponent {
  constructor(private _mainService: MainServiceService) {
    this._mainService.exploreService(Service.INTERIOR_CONSTRUCTION)
    let item = this._mainService.findMenuItem(Menu.SERVICE);
    if(item) this._mainService.activateEndpoint(item, false)
  }
}
