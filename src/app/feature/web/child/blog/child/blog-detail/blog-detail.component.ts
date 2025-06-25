import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JoinPost } from '../../../../../../interface/post';
import { DataService } from '../../../../../../core/service/data.service';
import { ApiService } from '../../../../../../core/service/api.service';
import { lastValueFrom } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

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
    private _apiService: ApiService,
    private sanitizer: DomSanitizer
  ){
    this._activedRoute.params.subscribe(data => {
      if(('slug' in data) == false) {
        this._router.navigate(['blog'])
      } else {
        let slug = data['slug'] as string;
        
        this._apiService.getPostBySlug(slug).subscribe(async res => {
          if(res.ok) {
            let data = res.body as JoinPost;
            const parser = new DOMParser();
            if(data) {
              // let doc = parser.parseFromString(data.content, 'text/html')
              // console.log("Header 1 found : ", doc.querySelectorAll('h1'))
              // console.log("Header 2 found : ", doc.querySelectorAll('h2'))
              // console.log("Header 3 found : ", doc.querySelectorAll('h3'))

              let content = await lastValueFrom(this._apiService.getBlogFile(slug))
              if(content) {
                data.content = this.sanitizer.bypassSecurityTrustHtml(content)
              }
            }
            
            this.post = data
          }
        })
        
      }
      
    })
  }
  ngOnInit(): void {
      
  }


}
