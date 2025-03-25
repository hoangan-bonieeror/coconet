import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../../core/service/api.service';
import { JoinPost } from '../../../../../../interface/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  posts: JoinPost[] = []
  constructor(
    private _apiService: ApiService,
    private _router: Router
  ) {}
  ngOnInit(): void {
      this._apiService.getAllPosts().subscribe(res => {
        if(res.ok) {
          let data = res.body as JoinPost[];
          this.posts = data
        }
      })
  }

  createNewBlog() {
    this._router.navigate(['admin/blog/new'])
  }
}
