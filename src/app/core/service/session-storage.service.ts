import { Injectable } from '@angular/core';

@Injectable({
  providedIn: null
})
export class SessionStorageService {
  storage : Storage;

  constructor() {
    this.storage = window.sessionStorage;
  }

  set(key: string, value : string) : void {
    this.storage[key] = value;
  }

  get(key : string) : string {
    return this.storage[key];
  }

  setObject(key : string, value : any) : void {
    if(!value) {
       return;
    }

    this.storage[key] = JSON.stringify(value);
  }

  getObject(key : string) : any {
    return JSON.parse(this.storage[key] || '{}');
  }

  getObjectByCustomType<T>(key : string): T | null {
    const obj = JSON.parse(this.storage[key] || null);
    return <T>obj || null;
  }

  remove(key : string) : any {
    this.storage.removeItem(key);
  }

  removeInArray(keys : string[]) {
    keys.map(key => {
      this.storage.removeItem(key);
    })
  }

  clear() {
    this.storage.clear();
  }

  get length() : number {
    return this.storage.length
  }

  get isStorageEmpty() : boolean {
    return this.storage.length === 0;
  }
}
