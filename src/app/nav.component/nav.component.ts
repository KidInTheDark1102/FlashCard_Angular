import {Component} from '@angular/core';

@Component({
  selector: 'app-nav',
  template: `<mat-toolbar>
    <button routerLink="" mat-button>FlashCard</button>
    <span style="position:absolute; right: 10px;">
      <button routerLink="register" mat-button>Register</button>
      <button routerLink="login" mat-button>Login</button>
    </span>
  </mat-toolbar>`
})
export class NavComponent { }
