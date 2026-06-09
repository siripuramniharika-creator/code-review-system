import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-forgot-password-dialog',
  imports: [MatDialogActions, MatDialogContent,MatButtonModule,MatDialogModule],
  templateUrl: './forgot-password-dialog.html',
  styleUrl: './forgot-password-dialog.css',
})
export class ForgotPasswordDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
