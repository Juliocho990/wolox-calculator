import { Component, OnInit } from '@angular/core';
import { LogDataService } from 'src/app/services/log-data.service';
import { ResultData } from 'src/app/classes/result-data';
import { CalculatorService } from 'src/app/services/calculator.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-log-book',
  templateUrl: './log-book.component.html',
  styleUrls: ['./log-book.component.scss']
})
export class LogBookComponent implements OnInit {

  constructor(private lodDataService: LogDataService, private calculatorService: CalculatorService, private location: Location) { }

  currentLogBookData: {operationView: string, result: string}[] = [];

  ngOnInit() {

    const currentLogData = this.lodDataService.getLogData();
    this.currentLogBookData =  currentLogData.map(data => {
      return {
        operationView: this.calculatorService.key2ViewValues(data.operation),
        result: data.result
      };
    });
  }

  onButtonBack() {
   this.location.back();
  }

}
