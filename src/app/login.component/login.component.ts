import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  form;
  constructor(private _fb: FormBuilder, @Inject(AuthService) public auth) {}

  ngOnInit() {
    this.form = this._fb.group({
      email: this._fb.control('', Validators.required),
      password: this._fb.control('', Validators.required)
    });
  }
}
