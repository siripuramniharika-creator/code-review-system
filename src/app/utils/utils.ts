import { Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Dashboard } from '../dashboard/dashboard';
import { History } from '../history/history';
import { Profile } from '../profile/profile';
import { CommonModule } from '@angular/common';
import { Home } from '../home/home';
import { Router } from '@angular/router';
import { CodeEditor } from "../code-editor/code-editor";
import { Analyzecode } from '../analyzecode/analyzecode';
import { CodeReview } from '../code-review/code-review';      
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialog } from '../logout-dialog/logout-dialog';

@Component({
  selector: 'app-utils',
  imports: [MatCardModule, MatIconModule, CommonModule, Dashboard, History, Profile, CodeEditor, Analyzecode, CodeReview,],
  templateUrl: './utils.html',
  styleUrl: './utils.css',
})
export class Utils {
  currentPage = 'dashboard';
  editorCode: string = '';
  constructor(private router: Router,
              public dialog: MatDialog
  ){}
  logout() {
    const dialogRef = this.dialog.open(LogoutDialog,{
      panelClass: 'logout-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        localStorage.clear();
        this.router.navigate(['/']);
      }
    });
  }
  selected = '';

  startAnalysis(event: { language: string; code: string }) {

    this.selected = event.language;
    this.editorCode = event.code;  
    this.currentPage = 'analyze-code';
  }
  goToEditor(keepCode: boolean) {
    if (!keepCode) {
      this.editorCode = ''; // NEW FILE → clear old code
    }

    this.currentPage = 'code-editor';
  }

}
