import { Component, OnInit } from '@angular/core';
import { Category, CategoryInput } from '../../../../interface/category';
import {
  AdminService,
  SidebarMenu,
} from '../../../../core/service/admin.service';
import { ApiService } from '../../../../core/service/api.service';
import { FormControl, Validators } from '@angular/forms';
import { categoryNameExistValidator } from '../../../../../utils/validator';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  categoryNameControl: FormControl;
  categoryNameUpdateControl: FormControl;
  submit: boolean;
  createLoading: boolean;
  isDisplayDialog: boolean;
  constructor(
    public _adminService: AdminService,
    private _apiService: ApiService,
    private _messageService: MessageService,
    private _confirmService: ConfirmationService
  ) {
    this.submit = false;
    this.createLoading = false;
    this.isDisplayDialog = false;

    this.categoryNameControl = new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
      categoryNameExistValidator(this.categories),
    ]);

    this.categoryNameUpdateControl = new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
      categoryNameExistValidator(this.categories),
    ]);

    window.addEventListener('keydown', (event) => {
      if(event.key === 'Enter') {
        if(this.isDisplayDialog) {
          this.onSave()
        }
      }
    });
  }
  ngOnInit(): void {
    let foundMenu = this._adminService.menus.find(o=>o.tittle==SidebarMenu.CATEGORY)
    if(foundMenu) {
      this._adminService.activeEndpoint(foundMenu)
    }
    this._apiService.getAllCategories().subscribe((res) => {
      if (res.ok) {
        let data = res.body as Category[];
        this.categories = data;
      }
    });

    let foundMenuItem = this._adminService.findMenuItem(SidebarMenu.CATEGORY);
    if (foundMenuItem) this._adminService.activeEndpoint(foundMenuItem, false);
  }
  onRowEditInit(category: Category) {
    this.categoryNameUpdateControl.setValue(category.name);
  }
  onRowEditSave(category: Category) {
    this.submit = true;
    if (this.categoryNameUpdateControl.invalid) {
      return;
    }

    let name = this.categoryNameUpdateControl.value as string;
    let categoryInput: CategoryInput = {
      name: name,
    };

    this._apiService
      .updateCategory(category.id, categoryInput)
      .subscribe((res) => {
        if (res.ok) {
          let data = res.body as Category;
          for (let item of this.categories) {
            if (item.id == category.id) {
              item.name = data.name;
              item.createdAt = data.createdAt;
              item.updatedAt = data.updatedAt;
              break;
            }
          }
          this.categoryNameUpdateControl.setValue('');
          this._messageService.add({
            severity: 'success',
            summary: 'Cập nhật phân loại',
            detail: 'Thành công'
          })
        } else {
          this._messageService.add({
            severity: 'error',
            summary: 'Cập nhật phân loại',
            detail: 'Thất bại'
          })
        }

        this.submit = false;
      });
  }

  onRowEditCancel(category: Category, index: number) {
    this.categoryNameUpdateControl.setValue('');
  }

  onSave() {
    this.createLoading = true;
    this.submit = true;
    if (this.categoryNameControl.invalid) {
      return;
    }
    let name = this.categoryNameControl.value as string;

    let categoryInput: CategoryInput = {
      name: name,
    };

    this._apiService.createCategory(categoryInput).subscribe((res) => {
      if (res.ok) {
        setTimeout(() => {
          let data = res.body as Category;
          this.categories.push(data);
          this.isDisplayDialog = false;

          this._messageService.add({
            severity: 'success',
            summary: 'Tạo phân loại',
            detail: 'Thành công'
          })
        }, 2000);
      } else {
        setTimeout(() => {
          this._messageService.add({
            severity: 'error',
            summary: 'Tạo phân loại',
            detail: 'Thất bại'
          })
        })
      }

      setTimeout(() => {
        this.createLoading = false;
        this.categoryNameControl.setValue('');
      }, 2000);
      this.submit = false;
    });
  }

  onCancel() {
    this.categoryNameControl.setValue('');
    this.isDisplayDialog = false;
    this.submit = false;
  }

  deleteCategory(category: Category) {
    this._confirmService.confirm({
      message: 'Bạn có chắc chắn muốn xóa phân loại này ?',
      header: 'Xác nhận',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
          label: 'Không',
          severity: 'secondary',
          outlined: true,
      },
      acceptButtonProps: {
          label: 'Có',
          styleClass: 'admin-button-dark'
      },
      accept: () => {
        this._apiService.deleteCategory(category.id).subscribe((res) => {
          if(res.ok) {
            this.categories = this.categories.filter(item => item.id != category.id)
            this._messageService.add({
              severity: 'success',
              summary: 'Xóa phân loại',
              detail: 'Thành công'
            })
          } else {
            this._messageService.add({
              severity: 'error',
              summary: 'Xóa phân loại',
              detail: 'Thất bại'
            })
          }
        })
      },
      reject: () => {},
    })
  }
}
