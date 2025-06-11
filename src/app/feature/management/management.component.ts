import { Component, OnInit } from '@angular/core';
import { AccordionItem } from '../../shared/accordion/accordion.component';
import { interval, map, Observable } from 'rxjs';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '../../core/service/localstorage.service';
import { LOCALSTORAGE_KEY } from '../../config/config';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent implements OnInit {
  readonly bellIcon = faBell;
  readonly userIcon = faUser;

  currentUser: any | null = null;
  // @ts-ignore
  currentDate$: Observable<string>; // Use an Observable
  accordionItems : AccordionItem[] = [
    {
      title: "Blog",
      endpoint: "blog"
    },
    {
      title: "Blog",
      endpoint: "blog"
    },
    {
      title: "Blog",
      endpoint: "blog"
    },
  ]
  constructor(
    private _localStorage: LocalStorageService
  ) {}
  ngOnInit(): void {
    // Create an observable that emits a new Date object every second.
    this.currentDate$ = interval(1000).pipe(
      map(() => new Date()),
      map(date => this.formatDate(date)) // Format the date
    );

    this.currentUser = this._localStorage.getObject(LOCALSTORAGE_KEY.USER)
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    return date.toLocaleDateString(undefined, options);
  }
  
}
