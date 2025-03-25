import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../../../../core/service/main.service.service';
import { Menu } from '../../../../config';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export enum Service {
  GENERAL = "Dịch vụ của chúng tôi", 
  DESIGN = "Thiết kế nội thất",
  CONSTRUCTION = "Thi công nội thất",
  RENOVATION = "Cải tạo làm mới không gian sống"
}

export const ServiceDescription : {[key in Service]: string} = {
  [Service.DESIGN]: "Coco.studio cung cấp dịch vụ thiết kế nội thất các công trình : Nhà Ở - Văn Phòng - Showoom.. Với sự sáng tạo và tận tâm, các thiết kế của chúng tôi luôn đề cao công năng sử dụng, tạo nên ko gian sống tiện nghi thẩm mỹ, và mang đậm dấu ấn cá tính gia chủ.",
  [Service.CONSTRUCTION]: "Tại Coco.studio, chúng tôi không chỉ thiết kế mà còn cung cấp dịch vụ thi công công trình chuyên nghiệp. Chúng tôi có đội ngũ nhân công giàu kinh nghiệm, có tay nghề cao và quy trình kiểm soát chặt chẽ, để mỗi công trình đều được hoàn thiện chỉn chu, đảm bảo chất lượng.Chúng tôi sẽ đồng hành cùng bạn để biến ý tưởng thành hiện thực.",
  [Service.RENOVATION]: "Với dịch vụ làm mới không gian sống, đáp ứng theo nhu cầu cá nhân của từng gia chủ Coco.studio sẽ giúp bạn cải tạo làm không gian sống trở nên mới mẻ, thoải mái và tiện nghi và đầy cảm hứng.",
  [Service.GENERAL]: ""
}

export interface ServiceDislay {
  label : Service
  imgFileName : string,
  description: string,
  endpoint: string
}

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.css',
  animations: [
    trigger("headerChange", [
      transition(':enter', [style({opacity: 0, transform: "translateY(100%)"}), animate('250ms', style({opacity: 1, transform: "translateY(0)"}))]),
      transition(':leave', [animate('250ms', style({opacity: 0}))]),
    ])
  ]
})
export class ServiceComponent implements OnInit {
  readonly ArrowRight = faArrowRight;
  readonly Service = Service;
  constructor(
    public _mainService: MainServiceService){
    }

  ngOnInit(): void {
    this._mainService.exploreService(Service.GENERAL)
    let serviceMenuItem = this._mainService.findMenuItem(Menu.SERVICE)
    if(serviceMenuItem) this._mainService.activateEndpoint(serviceMenuItem)
  }
}
