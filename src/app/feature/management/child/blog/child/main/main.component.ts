import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../../core/service/api.service';
import { JoinPost } from '../../../../../../interface/post';
import { Router } from '@angular/router';
import { POST_STATUS, POST_STATUS_MAP } from '../../../../../../config/config';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  private post$: BehaviorSubject<JoinPost[]> = new BehaviorSubject<JoinPost[]>([]);
  public _posts: Observable<JoinPost[]>;
  isPreview: boolean = false;
  previewContent: string|undefined = undefined;

  selectedPost: JoinPost | undefined;
  publishing = -1;
  readonly POST_STATUS_MAP = POST_STATUS_MAP;
  readonly POST_STATUS = POST_STATUS
  
  constructor(
    private _apiService: ApiService,
    private _router: Router,
    private _messageService: MessageService,
    private _confirmService: ConfirmationService
  ) {}
  ngOnInit(): void {
      this._apiService.getAllPosts().subscribe(res => {
        if(res.ok) {
          let data = res.body as JoinPost[];
          this.post$.next(data)
        }
      })

      this._posts = this.post$.asObservable()
  }

  createNewBlog() {
    this._router.navigate(['admin/blog/new'])
  }

  previewPost(postId: number) {
    let foundPost = this.post$.value.find(o=>o.id==postId);
    
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

  publishPost(postId: number) {
    this.publishing = postId

    let input = new FormData()
    input.append('status', POST_STATUS.PUBLISH)

    this._apiService.updatePost(postId, input).subscribe(res => {
      if(res.ok) {
        this.post$.next(this.post$.value.map(o=>{
          if(o.id == postId) {
            return {...res.body as JoinPost}
          }
          return o
        }))
        this._messageService.add({
          severity: 'success',
          summary: 'Cập nhật blog',
          detail: 'Thành công'
        })
      } else {
        this._messageService.add({
          severity: 'error',
          summary: 'Cập nhật blog',
          detail: 'Thất bại'
        })
      }

      this.publishing = -1
    })
    
  }

  deletePost(postId: number) {
    this._confirmService.confirm({
      message: 'Bạn có chắc chắn muốn xóa bài blog này ?',
      header: 'Xác nhận',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
          label: 'Hủy',
          severity: 'secondary',
          outlined: true,
      },
      acceptButtonProps: {
          label: 'Xác nhận'
      },
      acceptButtonStyleClass: 'admin-button-dark',
      accept: () => {
          this._apiService.deletePost(postId).subscribe(res => {
            if(res.ok) {
              this._messageService.add({
                severity: 'success',
                summary: 'Xóa blog',
                detail: 'Thành công'
              })
              this.post$.next(this.post$.value.filter(o=>o.id != postId))
            } else {
              this._messageService.add({
                severity: 'error',
                summary: 'Xóa blog',
                detail: 'Thất bại'
              })
            }
          })
      },
      reject: () => {},
    });
  }
}
