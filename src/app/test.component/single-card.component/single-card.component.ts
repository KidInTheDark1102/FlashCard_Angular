import {Component, Input, OnInit, Inject} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ResultDialogComponent} from "../../dialogs.component/dialogs.component";
import {Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {List} from '../../../Infrastructure/List';

@Component({
  selector: 'app-single-card-test',
  templateUrl: 'single-card.component.html'
})
export class SingleCardTestComponent implements OnInit {
  @Input() cards;
  @Input() options;
  index;
  peek;
  played;

  constructor(private dialog: MatDialog, private router: Router, @Inject(ApiService) private api) {}

  ngOnInit() {
    this.index = 0;
    this.peek = false;
    this.played = 1;
    this.shuffleCards();
  }

  shuffleCards() {
    if (this.options.isRandom) {
      this.api.getCards(this.cards.get(this.index).cardSetId).subscribe(response => {
        this.cards = new List<any>();
        while (response.length > 0) {
          this.cards.addToRandomIndex(0, this.cards.length(), response.pop());
        }
      });
    }
  }

  learnAgain() {
    const self = this;
    const card = this.cards.remove(this.index);
    window.setTimeout(() => {
      self.cards.addToRandomIndex(self.index + 1, self.cards.length(), card);
      console.log(self.cards);
    }, 100);
    this.peek = false;
    this.played++;
  }

  nextCard() {
    this.peek = false;
    this.index++;
    this.played++;
  }

  showResult() {
    const score = Math.floor(this.cards.length() / this.played * 100);
    const dialogRef = this.dialog.open(ResultDialogComponent, {
      data: {value: score, total: this.cards.length(), played: this.played},
      width: '600px',
      height: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['testboard']);
    });
  }
}
