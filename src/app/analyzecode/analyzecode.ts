import { CommonModule } from '@angular/common';
import { Component,OnInit  } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-analyzecode',
  imports: [CommonModule,MatIconModule],
  templateUrl: './analyzecode.html',
  styleUrl: './analyzecode.css',
})
export class Analyzecode implements OnInit, OnDestroy{
  
  @Output() reviewCompleted = new EventEmitter<void>();

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

  constructor(private cdr: ChangeDetectorRef,private router: Router) {}

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

        this.reviewCompleted.emit();
      }

    }, 100);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
