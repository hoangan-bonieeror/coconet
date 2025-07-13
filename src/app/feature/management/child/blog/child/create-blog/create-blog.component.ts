import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../../../interface/category';
import { ApiService } from '../../../../../../core/service/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostInput } from '../../../../../../interface/post';
import { Tag } from '../../../../../../interface/tag';
import { EditorTextChangeEvent } from 'primeng/editor';
import { parse } from 'node-html-parser';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../../../../core/service/localstorage.service';
import { LOCALSTORAGE_KEY, POST_STATUS } from '../../../../../../config/config';
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
  loadingPublish: boolean = false;
  loadingDraft: boolean = false;
  isPreview: boolean = false;

  isAutoGenerateSlug: boolean = true;

  constructor(
    private _apiService: ApiService,
    private _adminService: AdminService,
    private _router: Router,
    private _localStorageService : LocalStorageService,
    private _messageService: MessageService,
    private config: PrimeNG
  ) {
    this.blogForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      tags: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
      slug: new FormControl(null, [Validators.required]),
      meta_description: new FormControl(null, [Validators.required]),
      status: new FormControl(POST_STATUS.DRAFT),
      isAutoGenerateSlug: new FormControl(this.isAutoGenerateSlug)
    })

    this.blogForm.get('slug')?.disable()
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

  async saveDraft() {
    this.loadingDraft = true
    this.blogForm.get('status')?.setValue(POST_STATUS.DRAFT)
    await this.saveBlog()
    this.loadingDraft = false
  }

  async publishPost() {
    this.loadingPublish = true
    this.blogForm.get('status')?.setValue(POST_STATUS.PUBLISH)
    await this.saveBlog()   
    this.loadingPublish = false
  }

  async saveBlog() {
    try {
      this.submitted = true
      this.loading = true
      let title = this.blogForm.get("title")?.value
      let category = this.blogForm.get("category")?.value
      let content = this.blogForm.get("content")?.value
      let tags = this.blogForm.get('tags')?.value
      let slug = this.blogForm.get("slug")?.value
      let meta_description = this.blogForm.get("meta_description")?.value
      let status = this.blogForm.get("status")?.value
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
      console.log(content)
      let blogHtml = content as string;
      blogHtml = blogHtml.replaceAll("&nbsp;", " ");
      let formData = new FormData()
      formData.append('title', title)
      formData.append('content', blogHtml)
      formData.append('categoryId', category)
      formData.append('tagIds', tags)
      formData.append('authorId', authorId)
      formData.append('slug', slug)
      formData.append('meta_description', meta_description)
      formData.append('status', status)
      
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
  
        this.backToMain()
      } else {
        this._messageService.add({
          severity: 'error',
          summary: 'Tạo blog mới',
          detail: 'Thất bại'
        })
      }
  
      this.submitted = false
      this.loading = false
    } catch (error) {
      console.log(error)
      this._messageService.add({
        severity: 'error',
        summary: 'Tạo blog mới',
        detail: 'Thất bại'
      })
      this.submitted = false
      this.loading = false
    }
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

  onFileDrop(event) {
    this.onSelectOverviewImg(event)
  }

  onInputTitle() {
    let title = this.blogForm.get('title')?.value
    if(title && this.isAutoGenerateSlug) {
      this.blogForm.get('slug')?.setValue(this.generateSlug(title))
    }
  }

  toggleAutoGenerateSlug() {
    this.isAutoGenerateSlug = !this.isAutoGenerateSlug
    this.blogForm.get('isAutoGenerateSlug')?.setValue(this.isAutoGenerateSlug)
    if(this.isAutoGenerateSlug) {
      this.onInputTitle()

      this.blogForm.get('slug')?.disable()
    } else {
      this.blogForm.get('slug')?.enable()
    }
  }

  generateSlug(title: string) {
    return title
    .normalize("NFD")                         // Tách các dấu ra khỏi chữ
    .replace(/[\u0300-\u036f]/g, '')          // Loại bỏ dấu tiếng Việt
    .replace(/đ/g, 'd')                       // Chuyển đ -> d
    .replace(/Đ/g, 'D')                       // Chuyển Đ -> D
    .replace(/[!@%^*()+=<>?\/,.:;'\"&#[\]~$_`{}|\\]/g, '') // Xóa dấu câu
    .replace(/\s+/g, '-')                     // Thay khoảng trắng bằng dấu gạch ngang
    .replace(/-+/g, '-')                      // Gộp nhiều dấu gạch ngang
    .replace(/^-+|-+$/g, '')                  // Xóa gạch đầu và cuối chuỗi
    .toLowerCase();                           // Chuyển về chữ thường
  }

  formatLink() {
    return `${window.location.protocol}//${window.location.host}/blog/`;
  }

  processBlogContent(content) {
    if(content == null) return ''
    return content.replace(/&nbsp;/g, ' ')
  }
}
