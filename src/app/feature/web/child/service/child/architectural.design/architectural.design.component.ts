import { Component } from '@angular/core';
import { MainServiceService } from '../../../../../../core/service/main.service.service';
import { Service } from '../../service.component';
import { Menu } from '../../../../../../config';

@Component({
  selector: 'app-architectural.design',
  templateUrl: './architectural.design.component.html',
  styleUrl: './architectural.design.component.css'
})
export class ArchitecturalDesignComponent {
  constructor(private _mainService: MainServiceService) {
    this._mainService.exploreService(Service.ARCHITECTURAL_DESIGN)
    let item = this._mainService.findMenuItem(Menu.SERVICE);
    if(item) this._mainService.activateEndpoint(item, false)
  }
}
