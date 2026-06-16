import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Review {
  
   private data: any;

  setResult(value: any) {
    this.data = value;
  }

  getResult() {
    return this.data;
  }

  clear() {
    this.data = null;
  }
}
