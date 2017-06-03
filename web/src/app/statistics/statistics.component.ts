import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  quotes = []
  constructor(private statisticsService : StatisticsService) { }

  ngOnInit() {
    this.statisticsService.statistics().subscribe(quotes => {
      this.quotes = quotes;
    });
  }

}
