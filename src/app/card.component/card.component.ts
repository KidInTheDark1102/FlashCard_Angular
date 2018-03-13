import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {EditDialogComponent} from '../dialogs.component/dialogs.component';

@Component({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css']
})
export class CardComponent implements OnInit {
  question;
  newCard;
  questions;
  cardSet;

  constructor(@Inject(ApiService) private api, private snackBar: MatSnackBar, private route: ActivatedRoute,
              private dialog: MatDialog) {
    this.newCard = false;
    this.question = {};
  }

  ngOnInit() {
    this.route.params.subscribe(response => {
      this.cardSet = this.api.getSet(response.id).subscribe(res => {
        this.cardSet = res;
        this.getQuestions();
      });
    });
  }

  getQuestions() {
    this.api.getCards(this.cardSet.id).subscribe( response => {
      this.questions = response;
    });
  }

  NewCard() {
    this.newCard = !this.newCard;
    this.question = {};
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


  SubmitCard() {
    this.question.cardSetId = this.cardSet.id;
    console.log(this.question);
    if (this.question.question == null || this.question.answer == null) {
      this.snackBar.open(`Missing information`, ``, { duration: 2000 });
    } else {
      this.api.postCards(this.question).subscribe(response => {
        console.log(response);
        this.getQuestions();
        this.snackBar.open( `Added new card`, ``, {duration: 2000});
        setTimeout(() => {
          this.newCard = false;
          this.question = {};
        }, 500);
      });
    }
  }

  DeleteCard(id) {
    this.api.removeCard(id).subscribe(response => {
      this.getQuestions();
      this.newCard = false;
    });
  }

  EditCard(id) {
    this.newCard = true;
    this.api.getCard(id).subscribe(response => {
      this.question = response;
    });
  }

  UpdateCard() {
    this.api.updateCard(this.question).subscribe(response => {
      this.getQuestions();
      this.newCard = false;
    });
  }

  EditSet(set) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {title: set.title}
    });
    const self = this;
    dialogRef.afterClosed().subscribe(result => {
      set.title = result;
      this.api.updateSet(set).subscribe(response => {
      });
    });
  }
}


