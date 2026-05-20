import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-history',
  imports: [MatCardModule, MatIconModule,CommonModule],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History {
  reviews:any[] = [];
  @Output() startReview = new EventEmitter<void>();
  openCodeEditor() {

    this.startReview.emit();

  }
  
}
