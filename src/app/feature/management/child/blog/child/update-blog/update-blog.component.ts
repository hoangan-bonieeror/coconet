import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../../../core/service/api.service';
import { DataService } from '../../../../../../core/service/data.service';
import { JoinPost } from '../../../../../../interface/post';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../../../../interface/category';
import { Tag } from '../../../../../../interface/tag';
import { PrimeNG } from 'primeng/config';
import { LOCALSTORAGE_KEY } from '../../../../../../config/config';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrl: './update-blog.component.css',
})
export class UpdateBlogComponent implements OnInit, AfterViewInit {
  post: JoinPost | undefined;
  updateForm: FormGroup;
  isPreview: boolean;
  files = [];
  categoryOptions: Category[] = [];
  tagOptions: Tag[] = [];
  submitted: boolean = false;
  loading: boolean = false;
  img_overview_source: string | ArrayBuffer | null = null;
  img_file: File | null = null;

  isAutoGenerateSlug: boolean = true;
  constructor(
    private _activedRoute: ActivatedRoute,
    private _router: Router,
    private _apiService: ApiService,
    private config: PrimeNG,
    private _messageService: MessageService,
    private _dataService: DataService
  ) {
    this.updateForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      tags: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
      slug: new FormControl(null, [Validators.required]),
      meta_description: new FormControl(null, [Validators.required]),
      isAutoGenerateSlug: new FormControl(this.isAutoGenerateSlug)
    });
    this.isPreview = false;
  }
  ngOnInit(): void {
    this._apiService.getAllCategories().subscribe((res) => {
      if (res.ok) {
        let data = res.body as Category[];
        this.categoryOptions = data;
      }
    });
    this._apiService.getAllTags().subscribe((res) => {
      if (res.ok) {
        let data = res.body as Tag[];
        this.tagOptions = data;
      }
    });

    this._activedRoute.params.subscribe(async (data) => {
      if ('id' in data == false) {
        this._router.navigate(['blog']);
      } else {
        let id = data['id'] as number;
        
        let post = await this._dataService.getPostById(id)
        if(post) {
          this.post = post;
          this.updateForm.get('title')?.setValue(this.post?.title);
          this.updateForm.get('content')?.setValue(this.post?.content);
          this.updateForm.get('slug')?.setValue(this.post?.slug);
          this.updateForm.get('category')?.setValue(this.post?.category.id);
          this.updateForm.get('meta_description')?.setValue(this.post?.meta_description)
          this.updateForm
            .get('tags')
            ?.setValue(this.post?.tags.map((o) => o.id));
          this.updateForm.get('slug')?.disable()
          if (this.post?.img_overview) {
            let file = await this.urlToFile(this.post.img_overview);

            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.addEventListener('load', (e) => {
              this.img_overview_source = fileReader.result;
              this.img_file = file;
            });
          }
        } else {
          this._router.navigateByUrl('../')
        }
      }
    });
  }
  ngAfterViewInit(): void {}

  saveBlog() {
    if (!this.post) return;
    this.submitted = true;
    this.loading = true;
    let title = this.updateForm.get('title')?.value;
    let category = this.updateForm.get('category')?.value;
    let content = this.updateForm.get('content')?.value;
    let tags = this.updateForm.get('tags')?.value;
    let slug = this.updateForm.get('slug')?.value;
    let meta_description = this.updateForm.get("meta_description")?.value
    if (this.updateForm.invalid) {
      this.loading = false;
      return;
    }

    let blogHtml = content as string;
    blogHtml = blogHtml.replaceAll('&nbsp;', ' ');
    let formData = new FormData();
    formData.append('title', title);
    formData.append('content', blogHtml);
    formData.append('categoryId', category);
    formData.append('tagIds', tags);
    formData.append('slug', slug);
    formData.append('meta_description', meta_description)
    if (this.img_file) {
      formData.append('img_overview', this.img_file);
    }

    this._apiService
      .updatePost(this.post?.id, formData)
      .subscribe((response) => {
        if (response.ok) {
          this._messageService.add({
            severity: 'success',
            summary: 'Cập nhật blog',
            detail: 'Thành công',
          });

          this.backToMain();
        } else {
          this._messageService.add({
            severity: 'error',
            summary: 'Cập nhật blog',
            detail: 'Thất bại',
          });
        }
      });

    this.submitted = false;
    this.loading = false;
  }
  backToMain() {
    this._router.navigate(['admin/blog']);
  }
  showPreview() {
    this.isPreview = true;
  }

  hidePreview() {
    this.isPreview = false;
  }

  onClearImgOverview(clearCallback) {
    this.files = [];
    clearCallback();
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
  onSelectedFiles(event) {
    this.files = event.currentFiles;
  }

  async urlToFile(url: string) {
    const data = await lastValueFrom(this._apiService.getBlob(url));

    let filename = '';
    let list = url.split('/');
    if (list.length > 0) {
      filename = list[list.length - 1];
    }
    let file = new File([data], filename, { type: data.type });
    return file;
  }
  onDragOverviewImg(event: DragEvent) {
    console.log(event);
  }

  onSelectOverviewImg(data: FileList | null) {
    if (data == null) return;
    const file = data[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener('load', (e) => {
        this.img_overview_source = fileReader.result;
        this.img_file = file;
      });
    }
  }

  onFileDrop(event) {
    this.onSelectOverviewImg(event)
  }

  onInputTitle() {
    let title = this.updateForm.get('title')?.value
    if(title && this.isAutoGenerateSlug) {
      this.updateForm.get('slug')?.setValue(this.generateSlug(title))
    }
  }


  toggleAutoGenerateSlug() {
    this.isAutoGenerateSlug = !this.isAutoGenerateSlug
    this.updateForm.get('isAutoGenerateSlug')?.setValue(this.isAutoGenerateSlug)
    if(this.isAutoGenerateSlug) {
      this.onInputTitle()

      this.updateForm.get('slug')?.disable()
    } else {
      this.updateForm.get('slug')?.enable()
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
}
