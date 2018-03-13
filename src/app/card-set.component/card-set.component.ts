import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-card-set',
  templateUrl: 'card-set.component.html',
  styleUrls: ['card-set.component.css']
})
export class CardSetComponent implements OnInit {
  newSet;
  form;
  sets;
  constructor(private _fb: FormBuilder, @Inject(ApiService) private api,
              private cdRef: ChangeDetectorRef, @Inject(AuthService) private auth) {}

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

  Submit(formValue) {
    this.api.postSet(formValue).subscribe(response => {
      this.getSets();
    }, error => {
      this.auth.ErrorHandling(error);
    });
  }
}
