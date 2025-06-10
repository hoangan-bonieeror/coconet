import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../../core/service/api.service';
import { JoinPost } from '../../../../../../interface/post';
import { Router } from '@angular/router';
import { POST_STATUS_MAP } from '../../../../../../config/config';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  posts: JoinPost[] = [];
  isPreview: boolean = false;
  previewContent: string|undefined = undefined;

  selectedPost: JoinPost | undefined;
  readonly POST_STATUS_MAP = POST_STATUS_MAP;
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

  previewPost(postId: number) {
    let foundPost = this.posts.find(o=>o.id==postId);
    
    this.previewContent = foundPost?.content;
    this.selectedPost = foundPost
    this.showPreview()
  }

  showPreview() {
    this.isPreview = true
  }
  hidePreview() {
    this.isPreview = false
  }

  editPost(id: number) {
    this._router.navigate([`admin/blog/edit/${id}`])
  }
}
