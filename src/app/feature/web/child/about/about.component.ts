import { Component } from '@angular/core';
import { MainServiceService } from '../../../../core/service/main.service.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  constructor(
    public _mainService: MainServiceService
  ){}
}
