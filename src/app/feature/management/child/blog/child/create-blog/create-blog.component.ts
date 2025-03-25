import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../../../interface/category';
import { ApiService } from '../../../../../../core/service/api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { PostInput } from '../../../../../../interface/post';
import { Tag } from '../../../../../../interface/tag';
import { EditorTextChangeEvent } from 'primeng/editor';
import { parse } from 'node-html-parser';
@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.css'
})
export class CreateBlogComponent implements OnInit {
  blogForm: FormGroup;
  categoryOptions: Category[] = [];
  tagOptions : Tag[] = []

  constructor(
    private _apiService: ApiService
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

  saveBlog() {
    console.log(this.blogForm.get("title"))
    console.log(this.blogForm.get("category"))
    console.log(this.blogForm.get("content"))

    let title = this.blogForm.get("title")?.value
    let category = this.blogForm.get("category")?.value
    let content = this.blogForm.get("content")?.value

    let postInput: PostInput = {
      title,
      content,
      categoryId: category,
      authorId: ""
    }
    this._apiService.createPost(postInput).subscribe(res => {
      console.log(res)
    })
  }

  onTextChange(event: EditorTextChangeEvent) {
    let test = parse(event.htmlValue);
    console.log(test)
  }
}
