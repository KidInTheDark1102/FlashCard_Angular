import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MatDialog} from '@angular/material';
import {SettingHolderService} from '../../services/setting-holder.service';
import {Router} from '@angular/router';
import {ErrorComponent, PopupOptionComponent} from '../dialogs.component/dialogs.component';

@Component({
  selector: 'app-test-board',
  templateUrl: 'test-board.component.html'
})
export class TestBoardComponent implements OnInit {
  cardSets;
  @Output() change = new EventEmitter();

  constructor(@Inject(ApiService) private api, private dialog: MatDialog,
              @Inject(SettingHolderService) private setting, private router: Router) {}

  ngOnInit() {
    this.api.getSets().subscribe(response => {
      this.cardSets = response;
      },
      error => this.dialog.open(ErrorComponent, {
        data : {error: error}
      }));
  }

  showSetting (id) {
    const dialogRef = this.dialog.open(PopupOptionComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate([`test/${id}`]);
      }
    });
  }
}
