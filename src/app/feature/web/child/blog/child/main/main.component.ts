import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../../../interface/category';
import { ApiService } from '../../../../../../core/service/api.service';
import { JoinPost, Post } from '../../../../../../interface/post';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  currentCategory: string;
  categories: Category[] = [];
  blogs : JoinPost[];
  
  constructor(
    private _apiService: ApiService,
    private _router: Router
  ) {
    this.blogs = []
    this.currentCategory = 'Tất cả'
  }

  navigateBlog(id : number) {
    this._router.navigate([`blog/${id}`])
  }
  ngOnInit(): void {
      this._apiService.getAllCategories().subscribe(res => {
        if(res.ok) {
          let data = res.body as Category[]
          this.categories = data
        }
      })

      this._apiService.getAllPublishPosts().subscribe(res => {
        if(res.ok) {
          let data = res.body as JoinPost[];
          this.blogs = data
        }
      })
  }

  filterPost() {     
    return this.blogs.filter(o=>o.category.name==this.currentCategory || this.currentCategory == 'Tất cả')
  }
  selectCategory(name: string) {
    this.currentCategory = name;
  }
}
