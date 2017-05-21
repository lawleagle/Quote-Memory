import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../quote.service';

@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.css']
})
export class QuotesListComponent implements OnInit {
  error = null;

  quotes = []
  constructor(private quoteService : QuoteService) { }

  ngOnInit() {
    this.quoteService.quotesList().subscribe(quotes => {
      this.quotes = quotes;
    });
  }

  remove(quote) {
    this.error = null;
    this.quoteService.remove(quote.identifier).subscribe(response => {
      if (response.success) {
        this.quotes.splice(this.quotes.indexOf(quote), 1);
      }
      else {
        this.error = response.errorMessage;
      }
    });
  }

}
