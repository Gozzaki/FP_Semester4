import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  db: Storage;
  constructor() {
    this.db = window.localStorage;
  }

  get(key: any) {
    return this.db;
  }

  set(key: any, value: any) {
    this.db.setItem(key, value)
  }

  remove(key: any) {
    this.db.removeItem(key)
  }
}
