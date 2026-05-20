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

@Component({
  selector: 'app-utils',
  imports: [MatCardModule, MatIconModule, CommonModule, Dashboard, History, Profile, CodeEditor, Analyzecode, CodeReview],
  templateUrl: './utils.html',
  styleUrl: './utils.css',
})
export class Utils {
  currentPage = 'dashboard';
  constructor(private router: Router){}
  logout(){
    if(confirm("Are you sure you want to logout?")){
      this.router.navigate(['/']);
    } else {
      alert("Logout cancelled.");
    }     
  }
  selected = '';

  startAnalysis(language: string) {

  this.selected = language;

  this.currentPage = 'analyze-code';
}

}
