import { Component, OnInit } from '@angular/core';
import { DataService, Project } from '../../../../../core/service/data.service';
import { Router } from '@angular/router';
import { MainServiceService } from '../../../../../core/service/main.service.service';
import { Menu } from '../../../../../config';
import { NavPostion } from '../../../../../interface/common';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  searchStr : string = ""
  constructor(
    public _dataService: DataService,
    private _router: Router,
    private _mainService: MainServiceService
  ) {}
  ngOnInit(): void {
    let projectMenuItem = this._mainService.findMenuItem(Menu.PROJECT)
    if(projectMenuItem) this._mainService.activateEndpoint(projectMenuItem)
    this._mainService.setNavBarPosition(NavPostion.STICKY)
  }

  filterProject() {
    return this._dataService.filterProject(this.searchStr)
  }

  viewProjectGallery(project: Project) {
    this._router.navigate([
      'gallery'
    ],
    {
      queryParams: { name: project.name }
    })
  }
}
