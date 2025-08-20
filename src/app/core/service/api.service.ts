import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TagInput } from '../../interface/tag';
import { CategoryInput } from '../../interface/category';
import { UserInput, UserLogin } from '../../interface/user';
import { CustomerRequest, CustomerRequestInput } from '../../interface/request';
import { PostInput } from '../../interface/post';
import { environment } from "../../../environments/environment"
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = environment.apiUrl;
  private readonly headers = {'rejectUnauthorized': 'false'};
  constructor(
    private _httpCLient: HttpClient
  ) { }

  login(userLogin : UserLogin) {
    return this._httpCLient.post(
      `${this.baseUrl}/auth`,
      JSON.stringify(userLogin),
      {
        headers: {
          "Content-Type": "application/json",
          ...this.headers
        },
        observe: "response",
        responseType: "json"
      }
    )
  }
  createPost(post: FormData) {
    return this._httpCLient.post(
      `${this.baseUrl}/posts`,
      post,
      {
        headers: {...this.headers},
        observe: "response",
        responseType: "json"
      }
    )
  }

  updatePost(postId: number, post: FormData) {
    return this._httpCLient.put(
      `${this.baseUrl}/posts/${postId}`,
      post,
      {
        headers: {...this.headers},
        observe: "response",
        responseType: "json"
      }
    )
  }

  deletePost(postId: number) {
    return this._httpCLient.delete(
      `${this.baseUrl}/posts/${postId}`,
      {
        headers: {...this.headers},
        observe: "response",
        responseType: "json"
      }
    )
  }

  getAllPosts() {
    return this._httpCLient.get(
      `${this.baseUrl}/posts`,
      {
        headers: {
          "Content-Type": "application/json",
          ...this.headers
        },
        responseType: "json",
        observe: "response"
      }
    )
  }

  getPostBySlug(slug: string) {
    return this._httpCLient.get(
      `${this.baseUrl}/posts/${slug}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...this.headers
        },
        responseType: "json",
        observe: "response"
      }
    )
  }

  getBlogFile(slug: string) {
    return this._httpCLient.get(
      `${this.baseUrl}/posts/${slug}/html/${slug}.html`,
      {
        headers: {
          "Content-Type": "text/html",
          ...this.headers
        },
        responseType: "text"
      }
    )
  }

  getAllPublishPosts(limit: number|undefined = undefined, offset: number|undefined = undefined) {
    const queryParam = {}
    if(limit) queryParam['limit'] = limit
    if(offset) queryParam['offset'] = offset
    return this._httpCLient.get(
      `${this.baseUrl}/posts/publish`,
      {
        headers: {
          "Content-Type": "application/json",
          ...this.headers
        },
        params: queryParam,
        responseType: "json",
        observe: "response"
      }
    )
  }

  getAllDraftPosts() {
    return this._httpCLient.get(
      `${this.baseUrl}/posts/draft`,
      {
        headers: {
          "Content-Type": "application/json",
          ...this.headers
        },
        responseType: "json",
        observe: "response"
      }
    )
  }

  createTag(tagInput : TagInput){ 
    return this._httpCLient.post(
      `${this.baseUrl}/tags`,
      JSON.stringify(tagInput),
      {
        headers: {
          "Content-Type": "application/json",
          ...this.headers
        },
        observe: "response",
        responseType: "json"
      }
    )
  }
  getAllTags() {
    return this._httpCLient.get(
       `${this.baseUrl}/tags`,
       {
        headers: {
          "Content-Type": "application/json",
          ...this.headers
        },
        observe: "response",
        responseType: "json"
       }
    )
  }
  updateTag(id: number, tagInput : TagInput) {
    return this._httpCLient.put(
      `${this.baseUrl}/tags/${id}`,
      JSON.stringify(tagInput),
      {
        headers: {
          "Content-Type": "application/json",
          ...this.headers
        },
        observe: "response",
        responseType: "json"
      }
    )
  }
  deleteTag(id: number) {
    return this._httpCLient.delete(`${this.baseUrl}/tags/${id}`, {
        headers : {...this.headers},
        observe: "response",
        responseType: "json"
    })
  }
  createCategory(categroyInput : CategoryInput){ 
    return this._httpCLient.post(
      `${this.baseUrl}/categories`,
      JSON.stringify(categroyInput),
      {
        headers: {
          "Content-Type": "application/json",
          ...this.headers
        },
        observe: "response",
        responseType: "json"
      }
    )
  }
  getAllCategories() {
    return this._httpCLient.get(
       `${this.baseUrl}/categories`,
       {
        headers: {
          "Content-Type": "application/json",
          ...this.headers
        },
        observe: "response",
        responseType: "json"
       }
    )
  }
  updateCategory(id: number, categroyInput : CategoryInput) {
    return this._httpCLient.put(
      `${this.baseUrl}/categories/${id}`,
      JSON.stringify(categroyInput),
      {
        headers: {
          "Content-Type": "application/json",
          ...this.headers
        },
        observe: "response",
        responseType: "json"
      }
    )
  }
  deleteCategory(id: number) {
    return this._httpCLient.delete(`${this.baseUrl}/categories/${id}`,
      {
        headers: {...this.headers},
        observe: "response",
        responseType: "json"
      }
    )
  }
  createUser(userInput : UserInput){ 
    return this._httpCLient.post(
      `${this.baseUrl}/users`,
      JSON.stringify(userInput),
      {
        headers: {
          "Content-Type": "application/json",
          ...this.headers
        },
        observe: "response",
        responseType: "json"
      }
    )
  }
  getAllUsers() {
    return this._httpCLient.get(
       `${this.baseUrl}/users`,
       {
        headers: {
          "Content-Type": "application/json",
          ...this.headers
        },
        observe: "response",
        responseType: "json"
       }
    )
  }
  updateUser(id: number, userInput : UserInput) {
    return this._httpCLient.put(
      `${this.baseUrl}/users/${id}`,
      JSON.stringify(userInput),
      {
        headers: {
          "Content-Type": "application/json",
          ...this.headers
        },
        observe: "response",
        responseType: "json"
      }
    )
  }
  deleteUser(id: number) {
    return this._httpCLient.delete(`${this.baseUrl}/users/${id}`, {
        headers: {...this.headers},
        observe: "response",
        responseType: "json"
    })
  }

  sendRequest(request: CustomerRequestInput) {
    return this._httpCLient.post(`${this.baseUrl}/customer-request`, 
      JSON.stringify(request),
      {
        headers: {
          'Content-Type': 'application/json',
          ...this.headers
        },
        observe: "response",
        responseType: "json"
      }
    )
  }
  getAllRequests() {
    return this._httpCLient.get(`${this.baseUrl}/customer-request`,
      {
        headers: {...this.headers},
        observe: "response",
        responseType: "json"
      }
    )
  }

  getBlob(url: string) {
    return this._httpCLient.get(url, {
      responseType: 'blob'
    })
  }

  uploadImgBlog(file: File) {
    const uploadData = new FormData();
    uploadData.append('file', file);
    return this._httpCLient.post(`${this.baseUrl}/posts/upload-img`, uploadData,
      {
        headers: {...this.headers},
        observe: "response",
        responseType: "json"
      })
  }
  uploadVideoBlog(file: File) {
    const uploadData = new FormData();
    uploadData.append('file', file, file.name);
    return this._httpCLient.post(`${this.baseUrl}/blog-video`, uploadData,
      {
        headers: {...this.headers},
        observe: "response",
        responseType: "json"
      }
    )
  }
}
