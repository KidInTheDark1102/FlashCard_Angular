import {Component, Input, OnInit, Inject} from '@angular/core';
import {List} from '../../../Infrastructure/List';
import {ApiService} from '../../../services/api.service';
import {Card} from '../../../Infrastructure/Card';
import {MatDialog} from '@angular/material';
import {MultipleChoiceStepperResultDialogComponent} from "../../dialogs.component/stepper-result-dialog.component/multiple-choice-stepper-result-dialog.component";
import {Router} from '@angular/router';

@Component({
  selector: 'app-single-card-multiple-choice',
  templateUrl: 'single-card-multiple-choice.component.html'
})
export class SingleCardMultipleChoiceComponent implements OnInit {
  @Input() cards;
  @Input() options;
  cardList: List<Card>;
  answerList: List<string>;
  index;

  constructor(@Inject(ApiService) private api, private dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    this.index = 0;
    this.generateAnswerList();
    this.generateCardList();
  }

  nextCard() {
    this.index++;
  }

  showResult() {
    let score = 0;
    const incorrectList = new List<Card>();
    this.cardList.Value.forEach(card => {
      if (card.CorrectAnswer === card.SelectedAnswer) {
        score ++;
      } else {
        incorrectList.push(card);
      }
    });

    const dialogRef = this.dialog.open(MultipleChoiceStepperResultDialogComponent, {
      data: {total: this.cardList.length(), incorrectCards: incorrectList},
      width: '600px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['testboard']);
    });
  }

  generateCardList() {
    this.cardList = new List<Card>();
    this.cards.Value.forEach(response => {
      if (this.options.isRandom) {
          this.cardList.addToRandomIndex(0, this.cards.length(), this.createNewCard(response));
      } else {
          this.cardList.push(this.createNewCard(response));
      }
    });
  }

  createNewCard(card): Card {
    const newCard = new Card();
    newCard.Question = card.question;
    newCard.CorrectAnswer = card.answer;
    newCard.Answers = new Array<any>();
    newCard.Answers.push(card.answer);
    newCard.Answers.push(this.getRandomAnswers(newCard));
    newCard.Answers.push(this.getRandomAnswers(newCard));
    newCard.Answers.push(this.getRandomAnswers(newCard));
    this.shuffleArray(newCard.Answers);
    return newCard;
  }

  shuffleArray(array: Array<string>): void {
    for (let i = 0; i < array.length; i++) {
      const j = Math.floor(Math.random() * i);
      const k = Math.floor(Math.random() * i);
      [array[j], array[k]] = [array[k], array[j]];
    }
  }

  getRandomAnswers(card: Card): string {
    let response;
    do {
      response = this.answerList.get(Math.floor(Math.random() * this.answerList.length()));
    } while (card.Answers.indexOf(response) > -1);
    return response;
  }

  generateAnswerList() {
    this.answerList = new List<string>();
    this.cards.Value.forEach(card => {
      this.answerList.push(card.answer);
    });
  }
}
