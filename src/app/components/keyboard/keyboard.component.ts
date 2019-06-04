import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { CalculatorService } from 'src/app/services/calculator.service';
import { Subscription } from 'rxjs';
import { CalculatorData } from 'src/app/classes/calculator-data';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit, AfterViewInit, OnDestroy {

  keyboardButtonsA: CalculatorData[][] = [
    [
      { key: '(', keyView: null, isOperator: true },
      { key: ')', keyView: null, isOperator: true },
      { key: '%', keyView: null, isOperator: true },
      { key: 'C', keyView: 'AC', isOperator: true },
    ],
    [
      { key: '7', keyView: null, isOperator: false },
      { key: '8', keyView: null, isOperator: false },
      { key: '9', keyView: null, isOperator: false },
      { key: '/', keyView: '&divide;', isOperator: true },
    ],
    [
      { key: '4', keyView: null, isOperator: false },
      { key: '5', keyView: null, isOperator: false },
      { key: '6', keyView: null, isOperator: false },
      { key: '*', keyView: '&times;', isOperator: true },
    ],
    [
      { key: '1', keyView: null, isOperator: false },
      { key: '2', keyView: null, isOperator: false },
      { key: '3', keyView: null, isOperator: false },
      { key: '+', keyView: '&plus;', isOperator: true },
    ],
    [
      { key: '0', keyView: null, isOperator: false },
      { key: '.', keyView: null, isOperator: false },
      { key: '=', keyView: '&equals;', isOperator: true },
      { key: '-', keyView: '&minus;', isOperator: true },
    ],
  ];

  keyboardButtonsB = [
    [
      { key: 'Rad', keyView: null, isOperator: true },
      { key: 'Deg', keyView: null, isOperator: true },
      { key: '!', keyView: 'x!', isOperator: true }
    ],
    [
      { key: 'sin(', keyView: 'sin', isOperator: true },
      { key: 'cos(', keyView: 'cos', isOperator: true },
      { key: 'tan(', keyView: 'tan', isOperator: true }
    ],
    [
      { key: 'sqrt(', keyView: '&radic;', isOperator: true },
      { key: 'log(', keyView: 'log', isOperator: true },
      { key: '1/log(e)*log(', keyView: 'ln', isOperator: true },
    ],
    [
      { key: 'e^(', keyView: '&escr;<sup>x</sup>', isOperator: true },
      { key: '^(2)', keyView: 'x<sup>2</sup>', isOperator: true },
      { key: '^(', keyView: 'x<sup>y</sup>', isOperator: true }
    ],
    [
      { key: '1/(', keyView: '1/x', isOperator: true },
      { key: 'pi', keyView: '&pi;', isOperator: true },
      { key: 'e', keyView: '&escr;', isOperator: true }
    ],
  ];


  @ViewChild('degOperator') degOperator;
  @ViewChild('radOperator') radOperator;


  degreesSubscription: Subscription;

  constructor(private calculatorService: CalculatorService) { }


  ngOnInit() {
  }

  ngAfterViewInit() {
    this.degreesSubscription = this.calculatorService.degreesObs.subscribe(msg => {
      if (msg) {
        this.degOperator.nativeElement.className = 'inactive-operator';
        this.radOperator.nativeElement.className = 'cell-operator';
      } else {
        this.degOperator.nativeElement.className = 'cell-operator';
        this.radOperator.nativeElement.className = 'inactive-operator';
      }
    });
  }

  onKeyPressed(key: CalculatorData) {
    this.calculatorService.newData(key);
  }

  ngOnDestroy() {
    if (this.degreesSubscription !== undefined) {
      this.degreesSubscription.unsubscribe();
    }
  }
}
