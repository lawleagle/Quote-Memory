import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class StatisticsService {
  private endpointUrl = '/api/';

  constructor(private http : Http) { }

  statistics() {
    return this.http.get(this.endpointUrl + 'quotes').map(response => response.json());
  }

}
