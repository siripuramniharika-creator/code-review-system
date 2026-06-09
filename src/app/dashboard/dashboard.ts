import { Component,EventEmitter, Output  } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Auth } from '../services/auth';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatIconModule,CommonModule,RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  name : String = '';
  reviews:any[] = [];
  avgQuality = 0;
  avgSecurity = 0;
  avgPerformance = 0;

  @Output() startReview = new EventEmitter<void>();
  constructor(private auth: Auth) {}
  ngOnInit() {
    console.log("Dashboard loaded");

    const token = localStorage.getItem('token');

    console.log("TOKEN:", token);

    if (token) {
      const decoded: any = jwtDecode(token);

      console.log("JWT USER:", decoded);

      this.name = decoded.fullname || 'User';
    }

    const savedReviews = localStorage.getItem('reviews');

    if (savedReviews) {

      this.reviews = JSON.parse(savedReviews);

      this.calculateAverages();
    }
  }

  calculateAverages() {

    if (this.reviews.length === 0) return;

    let totalQuality = 0;
    let totalSecurity = 0;
    let totalPerformance = 0;

    this.reviews.forEach(review => {

      totalQuality += review.quality;
      totalSecurity += review.security;
      totalPerformance += review.performance;

    });

    this.avgQuality = Math.round(totalQuality / this.reviews.length);

    this.avgSecurity = Math.round(totalSecurity / this.reviews.length);

    this.avgPerformance = Math.round(totalPerformance / this.reviews.length);
  }

  openCodeEditor() {
    this.startReview.emit();
  }

}


