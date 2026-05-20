import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-logout-dialog',
  imports: [MatDialogContent, MatDialogActions,CommonModule,MatButtonModule,MatProgressSpinner],
  templateUrl: './logout-dialog.html',
  styleUrl: './logout-dialog.css',
})
export class LogoutDialog {
  loggingOut = false;

  constructor(private dialogRef: MatDialogRef<LogoutDialog>) {}

  onCancel() {
    this.dialogRef.close(false);
  }

  startLogout() {
    this.loggingOut = true;

    // simulate 3–5 sec logout delay
    setTimeout(() => {
      this.dialogRef.close(true);
    }, 4000);
  }
}
