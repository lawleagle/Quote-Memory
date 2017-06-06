import { Component, OnInit } from '@angular/core';

import { QuoteService } from '../services/quote.service';

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.css']
})
export class AddQuoteComponent implements OnInit {
  success = null;
  error = null;

  identifier = '';
  text = '';
  constructor(private quoteService : QuoteService) { }

  ngOnInit() {
  }

  submit() {
    this.error = null;
    this.success = null;
    if (this.identifier === '') {
      this.error = "Identifier cannot be empty!";
      return;
    }
    if (this.text === '') {
      this.error = "Text cannot be empty!";
    }
    this.quoteService.add(this.identifier, this.text).subscribe(response => {
      if (response.success) {
        this.success = "Quote was successfully added.";
        this.error = null;
      }
      else {
        this.success = null;
        this.error = response.errorMessage;
      }
    });
  }

}
