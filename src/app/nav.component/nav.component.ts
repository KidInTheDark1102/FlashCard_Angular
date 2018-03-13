import {Component, Inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  template: `<mat-toolbar>
    <button routerLink="testboard" mat-button>Test</button>
    <span style="position:absolute; right: 10px;">
      <button *ngIf="auth.isAuthenticated()" routerLink="flashcard" mat-button>FlashCard</button>
      <button *ngIf="!auth.isAuthenticated()" routerLink="register" mat-button>Register</button>
      <button *ngIf="!auth.isAuthenticated()" routerLink="login" mat-button>Login</button>
      <button *ngIf="auth.isAuthenticated()" (click)="this.auth.logOut()" mat-button>Logout</button>
    </span>
  </mat-toolbar>`
})
export class NavComponent {
  constructor(@Inject(AuthService) public auth) {}
}
