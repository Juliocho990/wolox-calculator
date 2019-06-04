import { Component, OnInit, OnDestroy } from '@angular/core';
import { CalculatorService } from 'src/app/services/calculator.service';
import { Subscription } from 'rxjs';
import { CalculatorData } from 'src/app/classes/calculator-data';
import { ResultData } from 'src/app/classes/result-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit, OnDestroy {

  constructor(private calculatorService: CalculatorService, private router: Router) {}

  operationView: string;
  resultView: string;
  calculatorDataSubscription: Subscription;
  resultDataSubscription: Subscription;

  ngOnInit() {
    this.calculatorDataSubscription =
      this.calculatorService.calculatorDataObs
        .subscribe((msg: CalculatorData[]) => {
          console.log(msg);
          if (msg) {
            this.operationView = this.calculatorService.key2ViewValues(msg);
          } else {
            this.operationView = null;
          }
        });
    this.resultDataSubscription =
      this.calculatorService.resultDataObs
        .subscribe((msg: ResultData) => {
          if (msg) {
            this.resultView = msg.result;
          } else {
            this.resultView = null;
          }
        });
  }

  onLogBookButton(event) {
    event.stopPropagation();
    this.router.navigate(['home/log']);
  }

  ngOnDestroy() {
    if (this.calculatorDataSubscription !== undefined) {
      this.calculatorDataSubscription.unsubscribe();
    }
    if (this.resultDataSubscription !== undefined) {
      this.resultDataSubscription.unsubscribe();
    }
  }

}
