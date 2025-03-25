import { Component, OnInit } from '@angular/core';
import { Tag, TagInput } from '../../../../interface/tag';
import { MenuItem } from 'primeng/api';
import { SelectChangeEvent } from 'primeng/select';
import { SORT_ORDER } from '../../../../config/config';
import { FormControl, Validators } from '@angular/forms';
import { tagNameExistValidator } from '../../../../../utils/validator';
import { ApiService } from '../../../../core/service/api.service';
import { AdminService, SidebarMenu } from '../../../../core/service/admin.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css'
})
export class TagComponent implements OnInit {
  isDisplayDialog: boolean = false;
  items: MenuItem[] | undefined;

  tagNameControl: FormControl;
  tagNameUpdateControl: FormControl;
  submit: boolean;
  createLoading: boolean;
  tags: Tag[] = [];

  constructor(
    private _apiService: ApiService,
    public _adminService: AdminService
  ) {
    this.submit = false
    this.createLoading = false
    this.items = [
      {
        label: SORT_ORDER.ASCENDING,
        icon: 'pi pi-sort-alpha-down'
      },
      {
          label: SORT_ORDER.DESCENDING,
          icon: 'pi pi-sort-alpha-down-alt'
      }
    ]

    this.tagNameControl = new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
      tagNameExistValidator(this.tags)
    ]);

    this.tagNameUpdateControl = new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
      tagNameExistValidator(this.tags)
    ]);
  }
  clonedTags: { [s: string]: Tag } = {};

  ngOnInit(): void {
      this._apiService.getAllTags().subscribe(res => {
        if(res.ok) {
          let data = res.body as Tag[];
          this.tags = data
        }
      })

      let foundMenuItem = this._adminService.findMenuItem(SidebarMenu.TAG)
      if(foundMenuItem) this._adminService.activeEndpoint(foundMenuItem, false)
  }

  onRowEditInit(tag: Tag) {
    this.tagNameUpdateControl.setValue(tag.name)
  }
  onRowEditSave(tag: Tag) {
    this.submit = true
    if(this.tagNameUpdateControl.invalid) {
      return
    }

    let name = this.tagNameUpdateControl.value as string
    let tagInput: TagInput = {
      name: name
    }
    this._apiService.updateTag(tag.id, tagInput).subscribe(res => {
      if(res.ok) {
        let data = res.body as Tag
        for(let item of this.tags){
          if(item.id == tag.id) {
            item.name = data.name
            item.createdAt = data.createdAt
            item.updatedAt = data.updatedAt
            break;
          }
        }
        this.tagNameUpdateControl.setValue("")
      }

      this.submit = false
    })
    
  }

  onRowEditCancel(tag: Tag, index: number) {
      this.tagNameUpdateControl.setValue("")
  }

  onChangeOrder(event: SelectChangeEvent) {
   if(event.value == SORT_ORDER.ASCENDING) {
    this.tags = this.tags.sort((a,b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
   } else {
    this.tags = this.tags.sort((a,b) => {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    })
   }
  }

  onSave() {
    this.createLoading = true
    this.submit = true
    if(this.tagNameControl.invalid) {
      return
    }
    let name = this.tagNameControl.value as string

    let tagInput : TagInput = {
      name: name
    }
    
    this._apiService.createTag(tagInput).subscribe(res => {
      if(res.ok) {
        setTimeout(()=>{
          let data = res.body as Tag;
          this.tags.push(data)
          this.isDisplayDialog = false
        }, 2000)
      }

      setTimeout(() => {
        this.createLoading = false
        this.tagNameControl.setValue("")
      }, 2000)
      this.submit = false
    })
  }

  onCancel() {
    this.tagNameControl.setValue("")
    this.isDisplayDialog = false
    this.submit = false
  }

  deleteTag(tag: Tag) {
    this._apiService.deleteTag(tag.id).subscribe((res) => {
      if(res.ok) {
        this.tags = this.tags.filter(item => item.id != tag.id)
      }
    })
  }
}
