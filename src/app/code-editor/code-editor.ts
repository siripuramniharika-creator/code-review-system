import { CommonModule } from '@angular/common';
import { Component,EventEmitter, Output,Input, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-code-editor',
  imports: [MatCardModule, MatIconModule, MatSelectModule,MatButtonModule,FormsModule,CommonModule, MatSnackBarModule,],
  templateUrl: './code-editor.html',
  styleUrl: './code-editor.css',
})
export class CodeEditor {
    selected = '';
    editorValue: string = '';
    uploadedFile: File | null = null;
    showLangError = false;
    showCodeError = false;
    private _language = '';
    private _code: string = '';
    constructor(private snackBar: MatSnackBar) {}
    @Input()
      set code(value: string) {
        this._code = value || '';
        this.editorValue = this._code;
    }
    get code() {
      return this._code;
    }
    @Input()
      set language(value: string) {
        this._language = value || '';
        this.selected = this._language;
    }

    get language() {
      return this._language;
    }
    @Output() cancelReview = new EventEmitter<void>();
    @Output() analyzeCode = new EventEmitter<{ language: string; code: string }>();
   
    
      

    goBack() {
      this.cancelReview.emit();
    }

  startAnalysis() {
    this.showLangError = false;
    this.showCodeError = false;
    if (!this.selected) {
      this.snackBar.open(
          'Please select a programming language',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          }
        ); 
        return;

    }

    // Code OR file validation
    if (!this.editorValue.trim() && !this.uploadedFile) {

       this.snackBar.open(
      'Please paste code or upload a file',
      'Close',
      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      }
    );
    return;
    }

      this.analyzeCode.emit({
        language: this.selected,
        code: this.editorValue
      });
  }
  onFileSelected(event: any) {

    this.uploadedFile = event.target.files[0]; 

  }
  
  
}

