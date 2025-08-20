import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../../../interface/category';
import { ApiService } from '../../../../../../core/service/api.service';
import { JoinPost, Post } from '../../../../../../interface/post';
import { Router } from '@angular/router';
import { Tag } from '../../../../../../interface/tag';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  isShowFilter: boolean = false;
  currentCategory: string;
  categories: Category[] = [];
  tags: {name: string, value: boolean}[] = []
  sortOptions: {value: boolean, title: string}[] = [
    {
      title: 'Mới nhất', value: false
    },
    {
      title: 'Cũ nhất', value: true
    }
  ]
  blogs : JoinPost[];
  filterBlogs : JoinPost[];

  selectedCategory: Category | null = null;
  selectedTags: Tag[] = [];
  searchStr: string = '';
  selectedSort: {value: boolean, title: string} = {
    value: false, title: 'Mới nhất'
  }
  
  constructor(
    private _apiService: ApiService,
    private _router: Router
  ) {
    this.blogs = [];
    this.filterBlogs = [];
    this.currentCategory = 'Tất cả'
  }

  navigateBlog(slug : string) {
    this._router.navigate([`blog/${slug}`])
  }
  ngOnInit(): void {
      window.addEventListener("click", (event) => {
        let target = event.target
        if(target) {
          // @ts-ignore
          if((target.id.length > 0 && target.id == 'filter-btn') 
          // @ts-ignore
            || (target.innerText.length > 0 && target.innerText == 'Bộ lọc')
          // @ts-ignore
            || (target.classList.length > 0 && target.classList.contains("pi-filter"))  
        ) {
            return
          }

          this.isShowFilter = false

        }
      })
      window.addEventListener("scroll" , () => {
        this.isShowFilter = false
      })
      this._apiService.getAllCategories().subscribe(res => {
        if(res.ok) {
          let data = res.body as Category[]
          
            this.categories = data
        }
      })

      this._apiService.getAllTags().subscribe(res => {
        if(res.ok) {
          let data = res.body as Tag[]
          for(const tag of data) {
            this.tags.push({
              name: tag.name,
              value : false
            })
          }
        }
      })

      this._apiService.getAllPublishPosts().subscribe(res => {
        if(res.ok) {
          let data = res.body as JoinPost[];
          this.blogs = data
          this.filterBlogs = this.blogs
          this.filterBlogByCategory()
        }
      })
  }

  filterPost() {     
    return this.blogs.filter(o=>o.category.name==this.currentCategory || this.currentCategory == 'Tất cả')
  }

  getRecentBlog() {
    return this.blogs.sort((a,b)=> {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })
  }
  selectCategory(category: Category | null = null) {
    this.selectedCategory = category;
    this.filterBlogByCategory()
  }


  // triggerFilter() {
  //   let listCategory = this.categories.filter(o=>o.value).map(o=>o.name)
  //   let listTag = this.tags.filter(o=>o.value).map(o=>o.name)

  //   this.filterBlogs = this.blogs.filter(o=> {
  //     let matchCategory = listCategory.length == 0 || listCategory.includes(o.category.name)
  //     let matchTag = listTag.length == 0 || o.tags.some(tag => listTag.includes(tag.name))

  //     let queryStr = this.removeVietnameseTones(this.searchStr.trim().toLocaleLowerCase())
  //     let titleStr = this.removeVietnameseTones(o.title)
  //     let matchSearchStr = this.searchStr.trim().length == 0 || titleStr.includes(queryStr)
  //     return matchCategory && matchTag && matchSearchStr
  //   })

  //   this.filterBlogs = this.sortByDate()
  // }


  sortByDate(): JoinPost[] {
    return this.filterBlogs.sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return this.selectedSort.value ? dateA - dateB : dateB - dateA;
    });
  }

  removeVietnameseTones(str: string): string {
    return str
      .normalize("NFD")                             // Tách dấu khỏi ký tự gốc
      .replace(/[\u0300-\u036f]/g, "")             // Loại bỏ dấu
      .replace(/đ/g, "d").replace(/Đ/g, "D")       // Chuyển đ -> d
      .replace(/[^\w\s]/gi, '')                    // Loại bỏ ký tự đặc biệt
      .replace(/\s+/g, ' ')                        // Bỏ khoảng trắng dư
      .trim()
      .toLowerCase();                              // Viết thường để so sánh
  }

  toggleFilter() {
    this.isShowFilter = !this.isShowFilter
  }


  filterBlogByCategory() {
    if(!this.selectedCategory) {
      this.filterBlogs = this.blogs
    } else {
      let categoryName = this.selectedCategory.name
      this.filterBlogs = this.blogs.filter(item => {
        return item.category.name == categoryName
      })
    }


    this.filterBlogs = this.sortByDate()
  }
}
