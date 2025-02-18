import { Component } from '@angular/core';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { MenuItem } from '../navbar/navbar.component';
import { MainServiceService } from '../../core/service/main.service.service';
import { Service } from '../../feature/web/child/service/service.component';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  readonly IconFacebook = faFacebook
  readonly IconInstagram = faInstagram;
  readonly IconPhone = faPhone;

  constructor(
    public _mainService: MainServiceService
  ) {}
  onNavigate(item: MenuItem) {
    this._mainService.exploreService(Service.GENERAL)
    this._mainService.activateEndpoint(item)
  }
}
