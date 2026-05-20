import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-code-review',
  imports: [MatButtonModule,MatCardModule,MatIconModule,CommonModule],
  templateUrl: './code-review.html',
  styleUrl: './code-review.css',
})
export class CodeReview {
  @Output() modify = new EventEmitter<void>();
  @Output() anotherReview = new EventEmitter<void>();
  @Output() backDashboard = new EventEmitter<void>();
  @Input() selected = '';
  currentDate = new Date().toLocaleDateString('en-GB');
  qualityScore = 93;
  securityScore = 64;
  performanceScore = 73;
  downloadReport() {

  const report = `
  AI Code Review Report
  =====================

  Date: ${this.currentDate}
  Language: ${this.selected}

  QUALITY SCORES
  --------------
  Code Quality: 72/100
  Security Score: 62/100
  Performance Score: 70/100

  ISSUES FOUND (5)
  ----------------
  1. Line 12: [WARNING] Variable declared but never used
  2. Line 25: [CRITICAL] Potential SQL injection vulnerability
  3. Line 38: [WARNING] Function complexity too high (cyclomatic complexity: 15)
  4. Line 47: [CRITICAL] Missing error handling for async operation
  5. Line 56: [INFO] Consider using const instead of let

  AI SUGGESTIONS
  --------------
  1. Add Input Validation
    Always validate and sanitize user inputs to prevent SQL injection and XSS attacks.

  2. Improve Error Handling
    Async operations should always include proper error handling using try-catch blocks.

  3. Reduce Function Complexity
    Break down complex functions into smaller focused functions.
  `;

    // Create file
    const blob = new Blob([report], { type: 'text/plain' });

    // Create download URL
    const url = window.URL.createObjectURL(blob);

    // Create anchor element
    const a = document.createElement('a');

    a.href = url;

    a.download = `AI-Code-Review-${this.selected}.txt`;

    // Trigger download
    a.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
  }
  issues = [

    {
      line: 12,
      description: 'Variable declared but never used',
      severity: 'Warning'
    },

    {
      line: 25,
      description: 'Potential SQL injection vulnerability',
      severity: 'Critical'
    },

    {
      line: 38,
      description: 'Function complexity too high',
      severity: 'Warning'
    },

    {
      line: 47,
      description: 'Missing error handling for async operation',
      severity: 'Critical'
    },

    {
      line: 56,
      description: 'Consider using const instead of let',
      severity: 'Info'
    }

  ];
  suggestions = [

    {
      title: 'Add Input Validation',

      description:
        'Always validate and sanitize user inputs to prevent SQL injection and XSS attacks.',

      originalCode:
    `const query =
    "SELECT * FROM users WHERE id = " + userId;`,

      improvedCode:
    `const query =
    "SELECT * FROM users WHERE id = ?";

    db.query(query, [userId]);`
    },

    {
      title: 'Improve Error Handling',

      description:
        'Async operations should always include proper error handling.',

      originalCode:
    `fetchData();`,

      improvedCode:
    `try {

    await fetchData();

    } catch(error) {

    console.error(error);

    }`
    },

    {
      title: 'Reduce Function Complexity',

      description:
        'Break large functions into smaller reusable functions.',

      originalCode:
    `function processData() {

    // 300 lines of code

    }`,

      improvedCode:
    `function validateData() {}
    function normalizeData() {}
    function transformData() {}`
    }

  ];
  comparison = {

    originalCode:
  `print("Hello World")`,

    improvedCode:
  `print("Hello World")

  // AI improvements applied based on suggestions above`

  };
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


