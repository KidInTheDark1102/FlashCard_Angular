import {Component, Inject, Input, OnInit} from '@angular/core';
import {SettingHolderService} from '../../services/setting-holder.service';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {ErrorComponent, PopupOptionComponent, ResultDialogComponent} from '../dialogs.component/dialogs.component';
import {List} from '../../Infrastructure/List';

@Component({
  selector: 'app-test',
  templateUrl: 'test.component.html'
})
export class TestComponent implements OnInit {
  set;
  cards: List<any>;
  isWelcome;
  options;

  pageIndex;
  peek;
  cardsPlayed;

  constructor(@Inject(SettingHolderService) private setting, private dialog: MatDialog,
              private route: ActivatedRoute, private api: ApiService, private router: Router) {

  }
  ngOnInit() {
    this.cards = new List<any>();
    this.options = new Options();
    this.isWelcome = true;
    this.peek = false;
    this.cardsPlayed = 0;
    this.options.isLinear = true;
    this.options.isStepper = this.setting.Setting ? this.setting.Setting.indexOf('one_by_one') === -1 : false;
    this.options.isRandom = this.setting.Setting ? this.setting.Setting.indexOf('random') > -1 : false;
    this.options.addIncorrect = this.setting.Setting ? this.setting.Setting.indexOf('add_incorect') > -1 : false;

    this.route.params.subscribe(params => {
      this.api.getSet(params.id).subscribe(response => this.set = response);
      this.api.getCards(params.id).subscribe(response => {
        response.forEach(card => {
          this.cards.push(card);
        });
      });
    });
    this.pageIndex = 0;
  }

  openSetting() {
    const dialogRef = this.dialog.open(PopupOptionComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.options.isLinear = true;
      this.options.isStepper = this.setting.Setting ? this.setting.Setting.indexOf('one_by_one') === -1 : false;
      this.options.isRandom = this.setting.Setting ? this.setting.Setting.indexOf('random') > -1 : false;
      this.options.addIncorrect = this.setting.Setting ? this.setting.Setting.indexOf('add_incorect') > -1 : false;
    });
  }

  start() {
    this.isWelcome = false;
    this.api.getCards(this.set.id).subscribe(response => {
      if (this.options.isRandom) {
        this.cards = new List<any>();
        while (response.length > 0) {
          this.cards.addToRandomIndex(0, this.cards.length(), response.pop());
        }
      }
    });
    console.log(this.cards);
  }

  Peek(value) {
    this.peek = true;
  }

  again(index: number) {
    const self = this;
    const card = this.cards.remove(index);
    window.setTimeout(function() {
      self.cards.addToRandomIndex(index + 1, self.cards.length(), card);
    }, 10);
    this.peek = false;
    this.cardsPlayed++;
  }

  skip() {
    this.peek = false;
    this.cardsPlayed++;
  }

  previousCard() {
    this.pageIndex--;
  }

  nextCard() {
    this.pageIndex++;
  }

  result() {
    const score = Math.floor(this.cards.length() / this.cardsPlayed * 100);
    const dialogRef = this.dialog.open(ResultDialogComponent, {
      data: {value: score, numberCards: this.cards.length(), total: this.cardsPlayed, cardSetId: this.set.id},
      width: '600px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['testboard']);
    });
  }
}

@Component({
  selector: 'app-test-card',
  template: `<div>
    {{card.question}}
  </div>`
})


export class TestCardComponent {
  @Input() card;
}

export class Options {
  private _isLinear: boolean;
  private _isRandom: boolean;
  private _addIncorrect: boolean;
  private _isStepper: boolean;

  constructor() {
    this._isLinear = false;
    this._isRandom = false;
    this._addIncorrect = false;
    this._isStepper = false;
  }
  get isLinear() {
    return this._isLinear;
  }

  set isLinear(value) {
    this._isLinear = value;
  }

  get isRandom() {
    return this._isRandom;
  }

  set isRandom(value) {
    this._isRandom = value;
  }

  get addIncorrect() {
    return this._addIncorrect;
  }

  set addIncorrect(value) {
    this._addIncorrect = value;
  }

  get isStepper() {
    return this._isStepper;
  }

  set isStepper(value) {
    this._isStepper = value;
  }
}
