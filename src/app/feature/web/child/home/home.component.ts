import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { heroArrowLeft, heroArrowRight } from '@ng-icons/heroicons/outline'
import { MainServiceService } from '../../../../core/service/main.service.service';
import { Menu } from '../../../../config';
import { DataService, MediaType, Project } from '../../../../core/service/data.service';
import { Router } from '@angular/router';
import { NavPostion } from '../../../../interface/common';
import { JoinPost } from '../../../../interface/post';
import { ApiService } from '../../../../core/service/api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  readonly heroArrowLeft = heroArrowLeft
  readonly heroArrowRight = heroArrowRight
  readonly MediaType = MediaType



  @ViewChild('mediaSlider') mediaSlider!: ElementRef<HTMLDivElement>;
  @ViewChild('blogListContainer') blogListContainer!: ElementRef<HTMLDivElement>

  selectCarouselIndex: number = 0

  carouselItem: {itemUrl : string, caption: string | undefined, }[] = [
    {
      itemUrl: 'https://res.cloudinary.com/halshop/image/upload/v1742726909/cocostudio/vista_duplex/B%E1%BA%A3n_sao_c%E1%BB%A7a_TOM3954-HDR_dvirdi.jpg',
      caption: ''
    },
    {
      itemUrl: 'https://res.cloudinary.com/halshop/image/upload/v1742726953/cocostudio/view/B%E1%BA%A3n_sao_c%E1%BB%A7a_V09-1_dqfdah.jpg',
      caption: ''
    },
    {
      itemUrl: 'https://res.cloudinary.com/halshop/image/upload/v1742726952/cocostudio/view/B%E1%BA%A3n_sao_c%E1%BB%A7a_V01-1_ufythd.jpg',
      caption: ''
    },
    {
      itemUrl: 'https://res.cloudinary.com/halshop/image/upload/v1742726996/cocostudio/midtown/B%E1%BA%A3n_sao_c%E1%BB%A7a__TOM3264_xu9h5e.jpg',
      caption: ''
    },
  ]

  isHover: boolean = true
  lastClickTime: number = 0;

  lastYScroll: number = 0
  ticking: boolean = false;

  posts: JoinPost[] = []

  constructor(
    public _mainService: MainServiceService,
    public _dataService: DataService,
    private _router: Router,
    private _apiService: ApiService
  ){}

  viewProjectGallery(project: Project) {
    this._router.navigate([
      'gallery'
    ],
    {
      queryParams: { name: project.name }
    })
  }
  exploreMore() {
    this._router.navigate(['/service'])
  }
  onIncrease() {
    let index = this.selectCarouselIndex + 1
    if(index == this.carouselItem.length) {
      index = 0
    }
    this.selectCarouselIndex = index
    this.lastClickTime = Date.now()
  }
  onDecrease() {
    let index = this.selectCarouselIndex - 1
    if(this.selectCarouselIndex == 0) {
      index = this.carouselItem.length-1
    }
    this.selectCarouselIndex = index
    this.lastClickTime = Date.now()
  }

  triggerIntervalIncrease() {
    setInterval(() => {
      let currentTime = Date.now()
      if(currentTime - this.lastClickTime > 5000) {
        this.onIncrease()
      }
    }, 2000)
  }

  onSlideForward() {
    if(this.mediaSlider) this.mediaSlider.nativeElement.scrollLeft += 300
  }

  onSlideBackward() {
    if(this.mediaSlider) this.mediaSlider.nativeElement.scrollLeft -= 300
  }

  ngOnInit(): void {
    let homeMenuItem = this._mainService.findMenuItem(Menu.HOME)
    if(homeMenuItem) this._mainService.activateEndpoint(homeMenuItem)
    this.triggerIntervalIncrease()
    this._mainService.setNavBarPosition(NavPostion.FIXED)
      this._apiService.getAllPublishPosts(10).subscribe(res => {
        if(res.ok) {
          let data = res.body as JoinPost[];
          this.posts = [...data, ...data, ...data,...data, ...data,...data, ...data]
        }
      })

  }

  navigateBlog(slug : string) {
    this._router.navigate([`blog/${slug}`])
  }

  onBlogForward() {
    if(this.blogListContainer) this.blogListContainer.nativeElement.scrollLeft += 300
  }

  onBlogBackward() {
    if(this.blogListContainer) this.blogListContainer.nativeElement.scrollLeft -= 300
  }
}
