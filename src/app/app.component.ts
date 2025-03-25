import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import AOS from 'aos'
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'coconet';
  ngOnInit(): void {
      AOS.init()
  }
}
