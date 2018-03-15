import {SettingHolderService} from '../../services/setting-holder.service';
import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-play-setting',
  template: `<mat-selection-list [(ngModel)]="selected">
      <mat-list-option *ngFor="let s of settings" value="{{s.value}}">{{s.type}}
      </mat-list-option>
    </mat-selection-list>
    <button mat-button (click)="startTest(selected)">Start</button>
    <button mat-button (click)="closeDialog()">Cancel</button>
  `
})
export class PopupOptionComponent {
  selected;
  settings = [{type: 'Play one-by-one', value: 'one_by_one'}, {type: 'Random', value: 'random'}, {type: 'Add Incorrect Answer', value: 'add_incorect'}];
  constructor(private dialogRef: MatDialogRef<PopupOptionComponent>, @Inject(SettingHolderService) private setting) {}

  closeDialog() {
    this.dialogRef.close();
  }

  startTest() {
    if (!this.selected) {
      this.selected = [];
    }
    this.setting.Setting = this.selected;
    this.dialogRef.close(this.selected);
  }
}


@Component({
  selector: 'app-error',
  template: `<mat-list>
    <h3 mat-subheader>Error: </h3>
    <mat-list-item *ngFor="let err of data.error">{{err.description}}</mat-list-item>
  </mat-list>
  <button mat-button (click)="this.dialogRef.close()">Close</button>`
})
export class ErrorComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<ErrorComponent>) {}
}

@Component({
  selector: 'app-edit-dialog',
  template: `
  <mat-card>
    <mat-card-header>
      <mat-card-title>
        New title:
      </mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <mat-form-field>
        <input type="text" matInput placeholder="title" [(ngModel)]="newTitle">
      </mat-form-field>
    </mat-card-content>
    <mat-card-actions>
      <button mat-button (click)="closeDialog()">Submit</button>
    </mat-card-actions>
  </mat-card>`
})
export class EditDialogComponent {
  newTitle;
  constructor(@Inject(MAT_DIALOG_DATA) public data, private dialogRef: MatDialogRef<EditDialogComponent> ) {}

  closeDialog() {
    this.dialogRef.close(this.newTitle);
  }
}

@Component({
  selector: 'app-result',
  template: `<mat-card>
    <mat-card-header>
      <mat-card-title>
        Result:
      </mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <mat-grid-list cols="2" rowHeight="2:1">
        <mat-grid-tile>
          {{data.value}}%
          <mat-progress-spinner [value]="value">
          </mat-progress-spinner>
        </mat-grid-tile>
        <mat-grid-tile>
           Total cards: {{data.total}}
          Cards replay: {{data.played - data.total}}
        </mat-grid-tile>
        <mat-grid-tile colspan="2">
          <button mat-button (click)="closeDialog()">Done</button>
        </mat-grid-tile>
      </mat-grid-list>
    </mat-card-content>
  </mat-card>`
})
export class ResultDialogComponent {
  value;
  constructor(private dialogRef: MatDialogRef<ResultDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
    this.value = this.data.value;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'app-info',
  template: `<mat-card>
    <mat-card-header>
      <mat-card-title>
        Info:
      </mat-card-title>
    </mat-card-header>
    <mat-card-content>
      {{data.value}}
    </mat-card-content>
  </mat-card>`
})
export class InformationComponent {
  constructor(private dialogRef: MatDialogRef<InformationComponent>, @Inject(MAT_DIALOG_DATA) public data) {}
}
