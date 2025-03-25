import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainServiceService } from './service/main.service.service';
import { DataService } from './service/data.service';
import { LocalStorageService } from './service/localstorage.service';
import { SessionStorageService } from './service/session-storage.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    MainServiceService,
    DataService,
    LocalStorageService,
    SessionStorageService
  ]
})
export class CoreModule { }
