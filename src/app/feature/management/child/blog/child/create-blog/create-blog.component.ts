import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../../../interface/category';
import { ApiService } from '../../../../../../core/service/api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { PostInput } from '../../../../../../interface/post';
import { Tag } from '../../../../../../interface/tag';
import { EditorTextChangeEvent } from 'primeng/editor';
import { parse } from 'node-html-parser';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../../../../core/service/localstorage.service';
import { LOCALSTORAGE_KEY } from '../../../../../../config/config';
import { AdminService } from '../../../../../../core/service/admin.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.css'
})
export class CreateBlogComponent implements OnInit {
  blogForm: FormGroup;
  categoryOptions: Category[] = [];
  tagOptions : Tag[] = []
  submitted: boolean = false;
  loading: boolean = false;
  isPreview: boolean = false;
  constructor(
    private _apiService: ApiService,
    private _adminService: AdminService,
    private _router: Router,
    private _localStorageService : LocalStorageService,
    private _messageService: MessageService
  ) {
    this.blogForm = new FormGroup({
      title: new FormControl(""),
      category: new FormControl(),
      tags: new FormControl(),
      content: new FormControl("")
    })
  }
  ngOnInit(): void {
      this._apiService.getAllCategories().subscribe(res => {
        if(res.ok) {
          let data = res.body as Category[];
          this.categoryOptions = data
        }
      })
      this._apiService.getAllTags().subscribe(res => {
        if(res.ok) {
          let data = res.body as Tag[]
          this.tagOptions = data
        }
      })
  }

  async saveBlog() {
    this.submitted = true
    this.loading = true
    let title = this.blogForm.get("title")?.value
    let category = this.blogForm.get("category")?.value
    let content = this.blogForm.get("content")?.value
    let tags = this.blogForm.get('tags')?.value
    let userObjFromLocal = this._localStorageService.getObject(LOCALSTORAGE_KEY.USER);
    if('id' in userObjFromLocal == false) {
      this.loading = false
      return
    }
    if(this.blogForm.invalid) {
      this.loading = false
      return
    }
    let authorId = userObjFromLocal['id']

    let blogHtml = content as string;
    blogHtml = blogHtml.replaceAll("&nbsp;", " ");
    let postInput: PostInput = {
      title,
      content: blogHtml,
      categoryId: category,
      authorId: authorId,
      tagIds: tags
    }
    this._apiService.createPost(postInput).subscribe(res => {
      
    })

    const response = await this._adminService.createPost(postInput)
    if(response.code == 201) {
      this._messageService.add({
        severity: 'success',
        summary: 'Tạo blog mới',
        detail: 'Thành công'
      })
    } else {
      this._messageService.add({
        severity: 'error',
        summary: 'Tạo blog mới',
        detail: 'Thất bại'
      })
    }

    this.submitted = false
    this.loading = false
  }

  backToMain() {
    this._router.navigate(['admin/blog'])
  }

  onTextChange(event: EditorTextChangeEvent) {
    let test = parse(event.htmlValue);
    // console.log(test.childNodes.filter(o=>o.rawTagName == 'h1').map(o=>o.textContent))
  }

  togglePreview() {
    this.isPreview = !this.isPreview
  }

  showPreview() {
    this.isPreview = true
  }

  hidePreview() {
    this.isPreview = false
  }
}
