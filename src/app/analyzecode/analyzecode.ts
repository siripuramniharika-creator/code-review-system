import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Review } from '../services/review';

@Component({
  selector: 'app-analyzecode',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './analyzecode.html',
  styleUrl: './analyzecode.css',
})
export class Analyzecode implements OnInit, OnDestroy {

  progress = 0;
  currentStep = 0;

  intervalId: any;
  pollInterval: any;

  isPolling = false;

  steps = [
    'Code structure analysis',
    'Security scan',
    'Performance check',
    'Quality check',
    'AI suggestions'
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private http: HttpClient,
    private review: Review
  ) {}

  ngOnInit() {

    this.intervalId = setInterval(() => {

      if (this.progress < 100) {

        this.progress++;

        this.currentStep = Math.min(
          Math.floor((this.progress / 100) * this.steps.length),
          this.steps.length - 1
        );

        this.cdr.detectChanges();

      } else {

        clearInterval(this.intervalId);
        this.startAnalysis();
      }

    }, 100);
  }

  startAnalysis() {

    const payload = {
      language: 'python',
      code: "def test():\n    eval('2+2')"
    };

    console.log('Submitting Review Request...');
    console.log('Payload:', payload);

    this.http.post('http://127.0.0.1:8000/api/review', payload)
      .subscribe({

        next: (res: any) => {

          console.log('Review Created:', res);

          const reviewId = res.review_id;

          console.log('Review ID:', reviewId);

          if (this.pollInterval) {
            clearInterval(this.pollInterval);
          }

          this.pollInterval = setInterval(() => {

            if (this.isPolling) {
              return;
            }

            this.isPolling = true;

            this.http.get(`http://127.0.0.1:8000/api/review/${reviewId}`)
              .subscribe({

                next: (data: any) => {

                  console.log('====================');
                  console.log('POLL RESPONSE');
                  console.log('====================');
                  console.log(data);

                  if (data.status === 'COMPLETED') {

                    console.log('Review Completed');

                    console.log('Quality Score:', data.quality_score);
                    console.log('Security Score:', data.security_score);
                    console.log('Performance Score:', data.performance_score);

                    console.log('Issues:', data.issues);
                    console.log('Suggestions:', data.suggestions);

                    console.log('Improved Code:', data.improved_code);

                    clearInterval(this.pollInterval);

                    this.review.setResult(data);

                    console.log('Saved to Review Service');

                    this.router.navigate(['/code-review']);
                  }

                  this.isPolling = false;
                },

                error: (err) => {

                  console.error('Polling Error:', err);

                  this.isPolling = false;
                }
              });

          }, 2000);
        },

        error: (err) => {

          console.error('Review Creation Error:', err);
        }
      });
  }

  ngOnDestroy() {

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }
  }
}