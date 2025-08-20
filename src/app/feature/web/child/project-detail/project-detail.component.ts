import { Component, ElementRef, input, OnInit, ViewChild } from '@angular/core';
import { DataService, ImgRatio, Project } from '../../../../core/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { heroArrowLeft, heroArrowRight, heroXMark } from '@ng-icons/heroicons/outline';
import { MainServiceService } from '../../../../core/service/main.service.service';
import { NavPostion } from '../../../../interface/common';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit {
  @ViewChild('arrowLeft', {static: true}) arrowLeft!: ElementRef<HTMLDivElement>;
  @ViewChild('arrowRight', {static: true}) arrowRight!: ElementRef<HTMLDivElement>;
  readonly heroArrowLeft = heroArrowLeft
  readonly heroArrowRight = heroArrowRight
  readonly heroXMark = heroXMark
  readonly ImgRatio = ImgRatio;
  project: Project | null = null;
  currentIndex: number = 0;
  isDisplayDialog: boolean = false;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _dataService: DataService,
    private _mainService: MainServiceService
  ) {}

  ngOnInit(): void {
      this._mainService.setNavBarPosition(NavPostion.STICKY)
      this._activatedRoute.queryParams.subscribe(params => {
        if('name' in params) {
          let projectName = params['name']
          let foundProject = this._dataService.getProjectByName(projectName)
          if(foundProject) {
            this.project = foundProject
          }
        }
        
      })

      window.onkeydown = (ev : KeyboardEvent) => {
         if(!this.isDisplayDialog) return
         if(ev.key == 'ArrowLeft') {
          this.onSlideBackward()
         } else if(ev.key == 'ArrowRight') {
          this.onSlideForward()
         }
      }
  }

  processImageUrl(filename: string) {
    return filename
  }

  setCurrentIndex(index: number) {
    this.currentIndex = index
  }

  onSlideBackward() {
    if(!this.project) return
    if(this.currentIndex == 0) {
      this.currentIndex = this.project.gallery.length-1
      return
    }

    this.currentIndex --
  }
  onSlideForward()  {
    if(!this.project) return
    if(this.currentIndex == this.project.gallery.length-1) {
      this.currentIndex = 0
      return
    }

    this.currentIndex ++
  }

  onClickImg(index:number) {
    this.showDialog()
    this.currentIndex = index
    console.log(index)
  }

  toggleDialog() {
    this.isDisplayDialog = !this.isDisplayDialog
    if(this.isDisplayDialog) {
      document.body.classList.add("stop-scrolling")
    } else {
      document.body.classList.remove("stop-scrolling")
    }
  }
  showDialog() {
    this.isDisplayDialog = true
    document.body.classList.add("stop-scrolling")
  }
  hideDialog() {
    this.isDisplayDialog = false
    document.body.classList.remove("stop-scrolling")
  }
}
