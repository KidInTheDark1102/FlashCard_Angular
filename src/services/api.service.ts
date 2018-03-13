import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment as env} from '../environments/environment';

@Injectable()
export class ApiService {
  baseUrl;
  constructor(private http: HttpClient) {
    this.baseUrl = env.baseUrl;
  }

  getCard(id) {
    return this.http.get(this.baseUrl + `/cards/` + id);
  }

  getCards(setId) {
    return this.http.get<Array<any>>(this.baseUrl + `/cards/set/` + setId);
  }

  postCards(card) {
    return this.http.post(this.baseUrl + `/cards`, card);
  }

  removeCard(id) {
    return this.http.delete(this.baseUrl + `/cards/` + id);
  }

  updateCard(question) {
    return this.http.put(this.baseUrl + `/cards/` + question.id, question);
  }

  postSet(set) {
    return this.http.post(this.baseUrl + `/cardsets/`, set);
  }

  getSet(id) {
    return this.http.get(this.baseUrl + `/cardsets/` + id);
  }

  getSets() {
    return this.http.get(this.baseUrl + `/cardsets/`);
  }

  removeSet(id) {
    return this.http.delete(this.baseUrl + `/cardsets/` + id);
  }

  updateSet(set) {
    return this.http.put(this.baseUrl + `/cardsets/` + set.id, set);
  }
}
