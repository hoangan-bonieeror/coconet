import { Injectable } from '@angular/core';
import { Menu, MenuItem, NavMenu } from '../../config';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

export enum Service {
  GENERAL = 'Dịch vụ của chúng tôi',
  DESIGN = 'Thiết kế nội thất',
  CONSTRUCTION = 'Thi công nội thất',
  RENOVATION = 'Cải tạo làm mới không gian sống',
}

export const ServiceDescription: { [key in Service]: string } = {
  [Service.DESIGN]:
    'Coco.studio cung cấp dịch vụ thiết kế nội thất các công trình : Nhà Ở - Văn Phòng - Showoom.. Với sự sáng tạo và tận tâm, các thiết kế của chúng tôi luôn đề cao công năng sử dụng, tạo nên ko gian sống tiện nghi thẩm mỹ, và mang đậm dấu ấn cá tính gia chủ.',
  [Service.CONSTRUCTION]:
    'Tại Coco.studio, chúng tôi không chỉ thiết kế mà còn cung cấp dịch vụ thi công công trình chuyên nghiệp. Chúng tôi có đội ngũ nhân công giàu kinh nghiệm, có tay nghề cao và quy trình kiểm soát chặt chẽ, để mỗi công trình đều được hoàn thiện chỉn chu, đảm bảo chất lượng.Chúng tôi sẽ đồng hành cùng bạn để biến ý tưởng thành hiện thực.',
  [Service.RENOVATION]:
    'Với dịch vụ làm mới không gian sống, đáp ứng theo nhu cầu cá nhân của từng gia chủ Coco.studio sẽ giúp bạn cải tạo làm không gian sống trở nên mới mẻ, thoải mái và tiện nghi và đầy cảm hứng.',
  [Service.GENERAL]: '',
};

export interface ServiceDislay {
  label: Service;
  imgFileName: string;
  description: string;
  endpoint: string;
}

@Injectable({
  providedIn: null,
})
export class MainServiceService {
  currentService: Service = Service.GENERAL;
  services: ServiceDislay[];
  menu: MenuItem[] = [];

  // Scroll
  scrollPosition: number = 0;
  // Navbar Height
  navbarHeight: number = 0;

  constructor(
    private _router: Router,
    private _viewportScroller: ViewportScroller
  ) {
    this.menu = [...NavMenu];
    this.services = [
      {
        label: Service.DESIGN,
        imgFileName: 'https://res.cloudinary.com/halshop/image/upload/v1742726951/cocostudio/view/B%E1%BA%A3n_sao_c%E1%BB%A7a_V04-2_h6cwni.jpg',
        description: ServiceDescription[Service.DESIGN],
        endpoint: 'service/architectural-design',
      },
      {
        label: Service.CONSTRUCTION,
        imgFileName: 'https://res.cloudinary.com/halshop/image/upload/v1742726953/cocostudio/view/B%E1%BA%A3n_sao_c%E1%BB%A7a_V09-1_dqfdah.jpg',
        description: ServiceDescription[Service.CONSTRUCTION],
        endpoint: 'service/interior-design',
      },
      {
        label: Service.RENOVATION,
        imgFileName: 'https://res.cloudinary.com/halshop/image/upload/v1742726959/cocostudio/view/B%E1%BA%A3n_sao_c%E1%BB%A7a_V20-1_jfun7s.jpg',
        description: ServiceDescription[Service.RENOVATION],
        endpoint: 'service/interior-construction',
      },
    ];

    window.onscroll = () => {
      this.setScrollPosition();
    };
  }

  setScrollPosition() {
    let [x, y] = this._viewportScroller.getScrollPosition();
    this.scrollPosition = y;
  }

  // Menu Manage Section
  activateEndpoint(activateItem: MenuItem, isNavigate: boolean = true) {
    this.menu.forEach((item) => {
      item.isActive = item.title == activateItem.title;
    });

    if (isNavigate) {
      this._router.navigate([activateItem.routerLink]);
    }
  }
  findMenuItem(title: string) {
    return this.menu.find((item) => item.title == title);
  }

  // Service Selection
  exploreService(service: Service) {
    this.currentService = service;
    this._viewportScroller.scrollToPosition([0, 0]);
  }

  // Navigation bar
  setNavbarHeight(height: number) {
    this.navbarHeight = height;
  }
  getNavbarHeight() {
    return this.navbarHeight;
  }
}
