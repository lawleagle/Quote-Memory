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
  token = '';
  constructor(private quoteService : QuoteService) { }

  ngOnInit() {
    this.quoteService.startQuiz().subscribe(response => {
      this.quote = response.quote;
      this.token = response.token;
    });
  }

  check() {
    this.quoteService.finishQuiz(this.token, this.input).subscribe(response => {
      if (response.success === true) {
        this.error = null;
        this.success = 'Congratulations! It seems that you learned this quote!';
      } else {
        this.error = response.errorMessage;
        this.success = null;
      }
    });
  }

  show() {
    this.error = null;
    this.success = this.quote.text;
  }
}
