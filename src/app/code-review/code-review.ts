import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EventEmitter, Output } from '@angular/core';
import { Review } from '../services/review';

@Component({
  selector: 'app-code-review',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './code-review.html',
  styleUrl: './code-review.css',
})
export class CodeReview implements OnInit {

  @Output() modify = new EventEmitter<void>();
  @Output() anotherReview = new EventEmitter<void>();
  @Output() backDashboard = new EventEmitter<void>();

  @Input() selected = '';

  currentDate = new Date().toLocaleDateString('en-GB');

  loading = true;

  reviewResult: any;

  qualityScore = 0;
  securityScore = 0;
  performanceScore = 0;

  issues: any[] = [];
  suggestions: any[] = [];

  comparison = {
    originalCode: '',
    improvedCode: ''
  };

  constructor(private review: Review) {}

  ngOnInit() {

    const data = this.review.getResult();

    console.log('==============================');
    console.log('Review data received:', data);
    console.log('==============================');

    if (!data) {
      console.log('No review data found');
      this.loading = false;
      return;
    }

    this.reviewResult = data;

    // Scores
    this.qualityScore = data.quality_score || 0;
    this.securityScore = data.security_score || 0;
    this.performanceScore = data.performance_score || 0;

    // Issues & Suggestions
    this.issues = data.issues || [];
    this.suggestions = data.suggestions || [];

    // Code Comparison
    this.comparison = {
      originalCode: data.original_code || '',
      improvedCode: data.improved_code || ''
    };

    console.log('Quality Score:', this.qualityScore);
    console.log('Security Score:', this.securityScore);
    console.log('Performance Score:', this.performanceScore);

    console.log('Issues:', this.issues);
    console.log('Suggestions:', this.suggestions);

    console.log('Original Code:', this.comparison.originalCode);
    console.log('Improved Code:', this.comparison.improvedCode);

    this.loading = false;
  }

  // ---------------------------
  // DOWNLOAD REPORT
  // ---------------------------
  downloadReport() {

    const report = `
AI Code Review Report
=====================

Date: ${this.currentDate}
Language: ${this.selected}

QUALITY SCORES
--------------
Code Quality: ${this.qualityScore}/100
Security Score: ${this.securityScore}/100
Performance Score: ${this.performanceScore}/100

ISSUES FOUND
------------
${this.issues.map((i, index) =>
  `${index + 1}. Line ${i.line || '-'}: ${i.title || i.description} [${i.severity}]`
).join('\n')}

AI SUGGESTIONS
--------------
${this.suggestions.map((s, index) =>
  `${index + 1}. ${s.title} - ${s.description}`
).join('\n')}

IMPROVED CODE
-------------
${this.comparison.improvedCode}
`;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `AI-Code-Review-${this.selected}.txt`;
    a.click();

    window.URL.revokeObjectURL(url);
  }

  // ---------------------------
  // EVENTS
  // ---------------------------
  modifyCode() {
    this.modify.emit();
  }

  reviewAnother() {
    this.anotherReview.emit();
  }

  goDashboard() {
    this.backDashboard.emit();
  }
}