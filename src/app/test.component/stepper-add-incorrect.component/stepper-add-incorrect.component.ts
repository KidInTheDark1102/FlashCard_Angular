import {Component, Input, OnInit} from '@angular/core';
import {List} from '../../../Infrastructure/List';
import {MatDialog} from '@angular/material';
import {MultipleChoiceStepperResultDialogComponent} from '../../dialogs.component/stepper-result-dialog.component/multiple-choice-stepper-result-dialog.component';
import {Card} from '../../../Infrastructure/Card';


@Component({
  selector: 'app-stepper-add-incorrect',
  templateUrl: 'stepper-add-incorrect.component.html'
})
export class StepperAddIncorrectComponent implements OnInit {
  @Input() cards;
  @Input() options;
  cardList: List<Card>;
  answerList: List<string>;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.cardList = new List<Card>();
    this.answerList = new List<string>();
    this.cards.Value.forEach(card => {
      this.answerList.push(card.answer);
    });

    this.cards.Value.forEach(card => {
      const newCard = new Card();
      newCard.Question = card.question;
      newCard.CorrectAnswer = card.answer;
      newCard.Answers.push(newCard.CorrectAnswer);
      newCard.Answers.push(this.getRandomAnswer(newCard));
      newCard.Answers.push(this.getRandomAnswer(newCard));
      newCard.Answers.push(this.getRandomAnswer(newCard));

      this.ShuffleArray(newCard.Answers);
      if (this.options.isRandom) {
        this.cardList.addToRandomIndex(0, this.cardList.length(), newCard);
      } else {
        this.cardList.push(newCard);
      }
    });
  }

  ShuffleArray(array: Array<any>): Array<any> {
    for (let i = 0; i < array.length; i++) {
      const j = Math.floor(Math.random() * i);
      const k = Math.floor(Math.random() * i);
      [array[k], array[j]] = [array[j], array[k]];
    }
    return array;
  }

  getRandomAnswer(card: Card): string {
    let answer: string;
    do {
      answer = this.answerList.get(this.getRandomIndex(0, this.answerList.length()));
    } while (card.Answers.indexOf(answer) > -1);
    return answer;
  }

  getRandomIndex(begin: number, end: number): number {
    return Math.floor(Math.random() * (end - begin) + begin);
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
  }
}


