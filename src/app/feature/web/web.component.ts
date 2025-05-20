import { Component } from '@angular/core';
import { MainServiceService } from '../../core/service/main.service.service';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrl: './web.component.css'
})
export class WebComponent {
  constructor(
    public _mainService: MainServiceService
  ){}
}
