import { Component } from '@angular/core';
import { Menu } from '../../../../../../config';
import { MainServiceService } from '../../../../../../core/service/main.service.service';
import { Service } from '../../service.component';

@Component({
  selector: 'app-full.service',
  standalone: true,
  imports: [],
  templateUrl: './full.service.component.html',
  styleUrl: './full.service.component.css'
})
export class FullServiceComponent {
  constructor(private _mainService: MainServiceService) {
    this._mainService.exploreService(Service.FULL_SERVICE)
    let item = this._mainService.findMenuItem(Menu.SERVICE);
    if(item) this._mainService.activateEndpoint(item, false)
  }
}
