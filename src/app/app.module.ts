import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatInputModule, MatCardModule, MatIconModule, MatToolbarModule,
  MatSnackBarModule, MatDividerModule, MatListModule, MatDialogModule, MatStepperModule, MatPaginatorModule,
  MatIconRegistry,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatGridListModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {CardComponent} from './card.component/card.component';
import { ApiService } from '../services/api.service';
import {CardSetComponent} from './card-set.component/card-set.component';
import {NavComponent} from './nav.component/nav.component';
import {RouterModule} from '@angular/router';
import {RegisterComponent} from './register.component/register.component';
import {LoginComponent} from './login.component/login.component';
import {AuthService} from '../services/auth.service';
import {AuthInterceptor} from '../services/auth.interceptor';
import {TestCardComponent, TestComponent} from './test.component/test.component';
import {TestBoardComponent} from './test-board.component/test-board.component';
import {SettingHolderService} from '../services/setting-holder.service';
import {
  EditDialogComponent, ErrorComponent, InformationComponent, PopupOptionComponent,
  ResultDialogComponent
} from './dialogs.component/dialogs.component';
import {StepperAddIncorrectComponent} from './test.component/stepper-add-incorrect.component/stepper-add-incorrect.component';
import {MultipleChoiceStepperResultDialogComponent} from './dialogs.component/stepper-result-dialog.component/multiple-choice-stepper-result-dialog.component';
import {SingleCardTestComponent} from './test.component/single-card.component/single-card.component';
import {SingleCardMultipleChoiceComponent} from './test.component/single-card-multiple-choice.component/single-card-multiple-choice.component';

const routes = [
  {path: '', component: TestBoardComponent},
  {path: 'flashcard', component: CardSetComponent},
  {path: 'cardset/:id', component: CardComponent},
  {path: 'testboard', component: TestBoardComponent},
  {path: 'test/:id', component: TestComponent},
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
    ErrorComponent,
    PopupOptionComponent,
    TestComponent,
    TestBoardComponent,
    TestCardComponent,
    ResultDialogComponent,
    InformationComponent,
    StepperAddIncorrectComponent,
    MultipleChoiceStepperResultDialogComponent,
    SingleCardTestComponent,
    SingleCardMultipleChoiceComponent,
  ],
  entryComponents: [
    EditDialogComponent,
    ErrorComponent,
    PopupOptionComponent,
    ResultDialogComponent,
    InformationComponent,
    MultipleChoiceStepperResultDialogComponent,
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
    MatDialogModule,
    MatStepperModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatRadioModule
  ],
  providers: [ApiService, AuthService,
    SettingHolderService, MatIconRegistry,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
