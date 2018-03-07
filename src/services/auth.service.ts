import {Component, Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment as env} from '../environments/environment';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';

@Injectable()
export class AuthService {
  baseUrl;
  constructor(private http: HttpClient, public dialog: MatDialog) {
    this.baseUrl = env.baseUrl;
  }

  registerUser(credentials) {
    this.http.post<string>(this.baseUrl + '/account', credentials).subscribe(
      response => {
        console.log(response);
        localStorage.setItem('token', response);
      },
      error => {
        this.dialog.open(ErrorComponent, {
          data: {error: error.error}
        });
      });
  }

  logIn(credentials) {
    this.http.post<string>(this.baseUrl + '/account/login', credentials).subscribe(
      response => {
        localStorage.setItem('token', response);
      },
      err => {
        let error;
        if (err.status === 404) {
          error = [{description: 'Connection failed'}];
        } else {
          error = err.error;
        }
        this.dialog.open(ErrorComponent, {
          data: {error: error}
        });
      }
    );
  }
}

@Component({
  selector: 'app-error',
  template: `<mat-list>
    <mat-list-item *ngFor="let err of data.error">{{err.description}}</mat-list-item>
  </mat-list>
  <button mat-button (click)="this.dialogRef.close()">Close</button>
  `
})
export class ErrorComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<ErrorComponent>) {}
}
