import {Component, Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment as env} from '../environments/environment';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {Router} from "@angular/router";
import {ErrorComponent} from "../app/dialogs.component/dialogs.component";

@Injectable()
export class AuthService {
  baseUrl;
  constructor(private http: HttpClient, public dialog: MatDialog, public router: Router) {
    this.baseUrl = env.baseUrl;
  }

  registerUser(credentials) {
    this.http.post<string>(this.baseUrl + '/account', credentials).subscribe(
      response => {
        this.Authenticate(response);
      },
      error => {
        this.ErrorHandling(error);
      });
  }

  logIn(credentials) {
    this.http.post<string>(this.baseUrl + '/account/login', credentials).subscribe(
      response => {
        this.Authenticate(response);
      },
      error => {
        this.ErrorHandling(error);
      }
    );
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  Authenticate(response) {
    localStorage.setItem('token', response);
    this.router.navigate(['']);
  }

  ErrorHandling(err) {
    let error;
    if (!err || err.status === 404) {
      error = [{description: 'Connection failed'}];
    } else if (err.status === 401) {
      error = [{description: 'Unauthorized! Please re-login!'}];
    } else {
      error = err.error;
    }
    this.dialog.open(ErrorComponent, {
      data: {error: error}
    });
  }
}

