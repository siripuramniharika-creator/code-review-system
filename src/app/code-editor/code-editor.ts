import { Component,EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-code-editor',
  imports: [MatCardModule, MatIconModule, MatSelectModule,MatButtonModule,FormsModule],
  templateUrl: './code-editor.html',
  styleUrl: './code-editor.css',
})
export class CodeEditor {
    selected = '';
    code = '';
    uploadedFile: File | null = null;
    @Output() cancelReview = new EventEmitter<void>();
    @Output() analyzeCode = new EventEmitter<string>();

    goBack() {
    this.cancelReview.emit();
  }

  startAnalysis() {
    if (!this.selected) {

      alert("Please select a programming language.");

      return;
    }

    // Code OR file validation
    if (!this.code.trim() && !this.uploadedFile) {

      alert("Please paste code or upload a file.");

      return;
    }

      this.analyzeCode.emit(this.selected);
  }
  onFileSelected(event: any) {

    this.uploadedFile = event.target.files[0];

  }
}

