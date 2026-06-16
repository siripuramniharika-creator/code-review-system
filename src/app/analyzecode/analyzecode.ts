import { CommonModule } from '@angular/common';
import { Component,OnInit  } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from '../services/review';

@Component({
  selector: 'app-analyzecode',
  imports: [CommonModule,MatIconModule],
  templateUrl: './analyzecode.html',
  styleUrl: './analyzecode.css',
})
export class Analyzecode implements OnInit, OnDestroy{ 
  
  @Output() reviewCompleted = new EventEmitter<any>();

  progress = 0;

  steps = [
    'Code structure analysis',
    'Security vulnerability scan',
    'Performance evaluation',
    'Code quality assessment',
    'Generating AI suggestions'
  ];

  currentStep = 0;
  intervalId: any;

  constructor(private cdr: ChangeDetectorRef,private router: Router, private http: HttpClient, private review: Review) {}

  ngOnInit() {
    console.log("Analyzecode loaded 🚀");

    this.intervalId = setInterval(() => {

      if (this.progress < 100) {
        this.progress += 1;

        this.currentStep = Math.min(
          Math.floor((this.progress / 100) * this.steps.length),
          this.steps.length - 1
        );
        this.cdr.detectChanges();

      } 
      else {
        clearInterval(this.intervalId);

        const payload = {
          language: "python",
          code: "def test():\n    eval('2+2')"
        };

        this.http.post('http://127.0.0.1:8000/api/review', payload)
        .subscribe({
          next: (response: any) => {
            console.log("API SUCCESS", response);

            this.review.setResult(response);

            console.log("Navigating...");

            this.router.navigate(['/code-review'])
            .then(result => {
              console.log("Navigation result:", result);
            })
            .catch(err => {
              console.error("Navigation failed:", err);
            });
          },
          error: (err) => {
            console.error("API ERROR", err);
          }
        });
      }

    }, 100);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
