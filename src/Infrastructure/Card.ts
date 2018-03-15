import {Injectable} from '@angular/core';

@Injectable()
export class Card {
  private _question: string;
  private _answers: Array<any>;
  private _correctAnswer: string;
  private _selectedAnswer: string;

  constructor() {
    this._answers = new Array<any>();
  }

  get Question() {
    return this._question;
  }

  set Question(value) {
    this._question = value;
  }

  get CorrectAnswer() {
    return this._correctAnswer;
  }

  set CorrectAnswer(value) {
    this._correctAnswer = value;
  }

  get Answers() {
    return this._answers;
  }

  set Answers(value) {
    this._answers = value;
  }

  get SelectedAnswer() {
    return this._selectedAnswer;
  }

  set SelectedAnswer(value) {
    this._selectedAnswer = value;
  }
}
