import { Component } from '@angular/core';
import { heroArrowLeft, heroArrowRight } from '@ng-icons/heroicons/outline'
import { MainServiceService } from '../../../../core/service/main.service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly heroArrowLeft = heroArrowLeft
  readonly heroArrowRight = heroArrowRight

  selectCarouselIndex: number = 0

  carouselItem: {itemUrl : string, caption: string | undefined, }[] = [
    {
      itemUrl: '../../../../../assets/panel/DosVistas.jpg',
      caption: 'DosVistas'
    },
    {
      itemUrl: '../../../../../assets/panel/GiftGuides.jpg',
      caption: 'GiftGuides'
    },
    {
      itemUrl: '../../../../../assets/panel/Holiday.jpg',
      caption: 'Holiday'
    },
    {
      itemUrl: '../../../../../assets/panel/HoustonEstate.jpg',
      caption: 'HoustonEstate'
    },
  ]

  constructor(public _mainService: MainServiceService){}

  onIncrease() {
    let index = this.selectCarouselIndex + 1
    if(index == this.carouselItem.length) {
      index = 0
    }
    this.selectCarouselIndex = index
  }
  onDecrease() {
    let index = this.selectCarouselIndex - 1
    if(this.selectCarouselIndex == 0) {
      index = this.carouselItem.length-1
    }
    this.selectCarouselIndex = index
  }

}
