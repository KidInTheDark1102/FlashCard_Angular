import {Injectable} from '@angular/core';

@Injectable()
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
