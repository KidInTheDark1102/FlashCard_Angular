import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-multiple-choice-result-dialog',
  templateUrl: 'stepper-result-dialog.component.html',
  styleUrls: ['stepper-result-dialog.component.css']
})
export class MultipleChoiceStepperResultDialogComponent {
  score;
  constructor(private dialogRef: MatDialogRef<MultipleChoiceStepperResultDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    this.score = Math.floor((data.total - data.incorrectCards.length()) / data.total * 100);
    console.log(this.score);
  }
}
