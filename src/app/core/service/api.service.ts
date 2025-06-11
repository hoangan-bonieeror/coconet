import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TagInput } from '../../interface/tag';
import { CategoryInput } from '../../interface/category';
import { UserInput, UserLogin } from '../../interface/user';
import { CustomerRequest, CustomerRequestInput } from '../../interface/request';
import { PostInput } from '../../interface/post';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = "http://localhost:3000"
  constructor(
    private _httpCLient: HttpClient
  ) { }

  login(userLogin : UserLogin) {
    return this._httpCLient.post(
      `${this.baseUrl}/auth`,
      JSON.stringify(userLogin),
      {
        headers: {
          "Content-Type": "application/json"
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
        observe: "response",
        responseType: "json"
      }
    )
  }

  deletePost(postId: number) {
    return this._httpCLient.delete(
      `${this.baseUrl}/posts/${postId}`,
      {
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
          "Content-Type": "application/json"
        },
        responseType: "json",
        observe: "response"
      }
    )
  }

  getAllPublishPosts() {
    return this._httpCLient.get(
      `${this.baseUrl}/posts/publish`,
      {
        headers: {
          "Content-Type": "application/json"
        },
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
          "Content-Type": "application/json"
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
          "Content-Type": "application/json"
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
          "Content-Type": "application/json"
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
          "Content-Type": "application/json"
        },
        observe: "response",
        responseType: "json"
      }
    )
  }
  deleteTag(id: number) {
    return this._httpCLient.delete(`${this.baseUrl}/tags/${id}`, {
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
          "Content-Type": "application/json"
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
          "Content-Type": "application/json"
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
          "Content-Type": "application/json"
        },
        observe: "response",
        responseType: "json"
      }
    )
  }
  deleteCategory(id: number) {
    return this._httpCLient.delete(`${this.baseUrl}/categories/${id}`,
      {
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
          "Content-Type": "application/json"
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
          "Content-Type": "application/json"
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
          "Content-Type": "application/json"
        },
        observe: "response",
        responseType: "json"
      }
    )
  }
  deleteUser(id: number) {
    return this._httpCLient.delete(`${this.baseUrl}/users/${id}`, {
        observe: "response",
        responseType: "json"
    })
  }

  sendRequest(request: CustomerRequestInput) {
    return this._httpCLient.post(`${this.baseUrl}/customer-request`, 
      JSON.stringify(request),
      {
        headers: {
          'Content-Type': 'application/json'
        },
        observe: "response",
        responseType: "json"
      }
    )
  }
  getAllRequests() {
    return this._httpCLient.get(`${this.baseUrl}/customer-request`,
      {
        observe: "response",
        responseType: "json"
      }
    )
  }

}
