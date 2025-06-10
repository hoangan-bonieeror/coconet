import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JoinPost } from '../../../../../../interface/post';
import { DataService } from '../../../../../../core/service/data.service';
import { ApiService } from '../../../../../../core/service/api.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent implements OnInit {
  post: JoinPost | undefined;
  constructor(
    private _activedRoute: ActivatedRoute,
    private _router: Router,
    private _dataService: DataService,
    private _apiService: ApiService
  ){
    this._activedRoute.params.subscribe(data => {
      if(('id' in data) == false) {
        this._router.navigate(['blog'])
      } else {
        let id = data['id'] as number;
        this._apiService.getAllPosts().subscribe(res => {
          if(res.ok) {
            let data = res.body as JoinPost[];
            let foundPost = data.find(o=>o.id==id)

            const parser = new DOMParser();
            if(foundPost) {
              let doc = parser.parseFromString(foundPost.content, 'text/html')
              console.log("Header 1 found : ", doc.querySelectorAll('h1'))
              console.log("Header 2 found : ", doc.querySelectorAll('h2'))
              console.log("Header 3 found : ", doc.querySelectorAll('h3'))
            }
            
            this.post = foundPost
          }
        })
        
      }
      
    })
  }
  ngOnInit(): void {
      
  }


}
