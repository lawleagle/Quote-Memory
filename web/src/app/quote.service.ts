import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class QuoteService {
  private endpointUrl = '/api/';

  constructor(private http : Http) { }

  quotesList() {
    return this.http.get(this.endpointUrl + 'quotes').map(response => response.json());
  }

  add(identifier, text) {
    return this.http.post(this.endpointUrl + 'quote', {
      identifier: identifier,
      text: text
    }).map(response => response.json());
  }

  remove(identifier) {
    return this.http.delete(this.endpointUrl + 'quote/' + identifier).map(response => response.json());
  }

  random() {
    return this.http.get(this.endpointUrl + 'randomQuote').map(response => response.json());
  }
}
