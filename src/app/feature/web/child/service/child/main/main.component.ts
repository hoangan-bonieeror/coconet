import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../../../../../../core/service/main.service.service';
import { Service } from '../../service.component';
import { Router } from '@angular/router';
import Aos from 'aos';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Menu } from '../../../../../../config';

export interface ServiceDislay {
  label : Service
  imgFileName : string,
  description: string,
  endpoint: string
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  readonly Service = Service;
  readonly ArrowRight = faArrowRight;
  services : ServiceDislay[];
  constructor(
    private _mainService: MainServiceService,
    private _router: Router
  ) {
    this.services = [
      {
        label: Service.FULL_SERVICE,
        imgFileName: 'service2.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id convallis arcu, et auctor orci. Aenean suscipit lectus a facilisis dapibus. Suspendisse potenti. Quisque ac nunc nec libero fringilla accumsan vel pellentesque turpis.',
        endpoint: 'service/full-service'
      },
      {
        label: Service.ARCHITECTURAL_DESIGN,
        imgFileName: 'service1.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id convallis arcu, et auctor orci. Aenean suscipit lectus a facilisis dapibus. Suspendisse potenti. Quisque ac nunc nec libero fringilla accumsan vel pellentesque turpis.',
        endpoint: 'service/architectural-design'
      },
      {
        label: Service.INTERIOR_DESIGN,
        imgFileName: 'service2.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id convallis arcu, et auctor orci. Aenean suscipit lectus a facilisis dapibus. Suspendisse potenti. Quisque ac nunc nec libero fringilla accumsan vel pellentesque turpis.',
        endpoint: 'service/interior-design'
      },
      {
        label: Service.INTERIOR_CONSTRUCTION,
        imgFileName: 'service2.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id convallis arcu, et auctor orci. Aenean suscipit lectus a facilisis dapibus. Suspendisse potenti. Quisque ac nunc nec libero fringilla accumsan vel pellentesque turpis.',
        endpoint: 'service/interior-construction'
      }
    ]
  }

  ngOnInit(): void {
    this._mainService.exploreService(Service.GENERAL)
    let item = this._mainService.findMenuItem(Menu.SERVICE);
    if(item) this._mainService.activateEndpoint(item, false)
  }
  exploreService(service: ServiceDislay) {
    this._router.navigate([service.endpoint])
  }
}
