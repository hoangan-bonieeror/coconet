import { Component, OnInit } from '@angular/core';
import { Category, CategoryInput } from '../../../../interface/category';
import {
  AdminService,
  SidebarMenu,
} from '../../../../core/service/admin.service';
import { ApiService } from '../../../../core/service/api.service';
import { FormControl, Validators } from '@angular/forms';
import { categoryNameExistValidator } from '../../../../../utils/validator';

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
    private _apiService: ApiService
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
  }
  ngOnInit(): void {
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
    this.categoryNameControl.setValue(category.name);
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
        }, 2000);
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
    this._apiService.deleteCategory(category.id).subscribe((res) => {
      if(res.ok) {
        this.categories = this.categories.filter(item => item.id != category.id)
      }
    })
  }
}
