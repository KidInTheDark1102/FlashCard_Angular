import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  form;
  constructor(private _fb: FormBuilder, @Inject(AuthService) public auth) {}

  ngOnInit() {
    this.form = this._fb.group({
      first: this._fb.control('', Validators.required),
      last: this._fb.control('', Validators.required),
      email: this._fb.control('', Validators.required),
      password: this._fb.control('', Validators.required),
      repassword: this._fb.control('', Validators.required)
    });
  }
}
