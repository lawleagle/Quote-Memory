import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../quote.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  error = null;
  success = null;
  display = null;

  quote = {
    text: '',
    identifier: ''
  };
  input = '';
  constructor(private quoteService : QuoteService) { }

  ngOnInit() {
    this.quoteService.random().subscribe(quote => {
      this.quote = quote;
    });
  }

  check() {
    if (this.input === this.quote.text) {
      this.error = null;
      this.success = 'Congratulations! It seems that you learned this quote!';
    }
    else {
      this.error = 'It looks like you do not know this quote well enough. Try again!';
      this.success = null;
    }
  }

  show() {
    this.error = null;
    this.success = this.quote.text;
  }
}
