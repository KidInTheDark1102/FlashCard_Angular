import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatInputModule, MatCardModule, MatIconModule, MatToolbarModule,
  MatSnackBarModule, MatDividerModule, MatListModule, MatDialogModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { CardComponent} from './card.component/card.component';
import { ApiService } from '../services/api.service';
import {CardSetComponent, EditDialogComponent} from './card-set.component/card-set.component';
import {NavComponent} from './nav.component/nav.component';
import {RouterModule} from '@angular/router';
import {RegisterComponent} from './register.component/register.component';
import {LoginComponent} from './login.component/login.component';
import {AuthService, ErrorComponent} from '../services/auth.service';
import {AuthInterceptor} from "../services/auth.interceptor";

const routes = [
  {path: '', component: CardSetComponent},
  {path: 'cardset/:id', component: CardComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardSetComponent,
    NavComponent,
    EditDialogComponent,
    RegisterComponent,
    LoginComponent,
    ErrorComponent
  ],
  entryComponents: [
    EditDialogComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NoopAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule
  ],
  providers: [ApiService, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
