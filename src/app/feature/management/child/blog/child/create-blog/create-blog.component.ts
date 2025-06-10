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
import { PrimeNG } from 'primeng/config';
@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.css'
})
export class CreateBlogComponent implements OnInit {
  img_file: File | null = null;
  img_overview_source : string | ArrayBuffer | null = null
  files = [];
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
    private _messageService: MessageService,
    private config: PrimeNG
  ) {
    this.blogForm = new FormGroup({
      title: new FormControl(""),
      category: new FormControl(),
      tags: new FormControl(),
      content: new FormControl(""),
      slug: new FormControl("")
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
    let slug = this.blogForm.get("slug")?.value
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
    let formData = new FormData()
    formData.append('title', title)
    formData.append('content', blogHtml)
    formData.append('categoryId', category)
    formData.append('tagIds', tags)
    formData.append('authorId', authorId)
    formData.append('slug', slug)
    if(this.img_file) {
      formData.append('img_overview', this.img_file)
    }

    const response = await this._adminService.createPost(formData)
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

  onSelectedFiles(event) {
    this.files = event.currentFiles;
  }

  onClearImgOverview(clearCallback) {
    this.files = []
    clearCallback()
  }


  formatSize(bytes) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes;
    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
  }
  onDragOverviewImg(event: DragEvent) {
    console.log(event)
  }

  onSelectOverviewImg(data: FileList) {
    const file = data[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener("load", (e) => {
        this.img_overview_source  = fileReader.result
        this.img_file = file
      });    
    }
  }
}
