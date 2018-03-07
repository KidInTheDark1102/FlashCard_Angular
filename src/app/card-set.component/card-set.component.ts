import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-card-set',
  templateUrl: 'card-set.component.html',
  styleUrls: ['card-set.component.css']
})
export class CardSetComponent implements OnInit {
  newSet;
  form;
  sets;
  constructor(private _fb: FormBuilder, @Inject(ApiService) private api, private dialog: MatDialog,
              private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.form = this._fb.group({
      title: this._fb.control('')
    });
    this.getSets();
    this.newSet = false;
  }

  NewSet() {
    this.newSet = !this.newSet;
  }

  getSets() {
    this.api.getSets().subscribe(response => this.sets = response);
  }

  DeleteSet(id) {
    this.api.removeSet(id).subscribe(response => {
      this.getSets();
    });

  }

  EditSet(set) {
    let dialogRef = this.dialog.open(EditDialogComponent, {
        data: {title: set.title}
      });
    const self = this;
    dialogRef.afterClosed().subscribe(result => {
      set.title = result;
      this.api.updateSet(set).subscribe(response => {
      });
    });
  }

  Submit(formValue) {
    this.api.postSet(formValue).subscribe(response => {
      this.getSets();
    });
  }
}

@Component({
  selector: 'app-edit-dialog',
  template: `<mat-card>
      <mat-card-header>
        <mat-card-title>
          New Title:
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <input matInput placeholder="New Title" type="text" [(ngModel)]="data.title" style="width: 500px;">
      </mat-card-content>
      <mat-card-actions>
        <button (click)="closeDialog()" mat-button>Update</button>
      </mat-card-actions>
    </mat-card>`
})
export class EditDialogComponent{
  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }
  closeDialog() {
    this.dialogRef.close(this.data.title);
  }
}
