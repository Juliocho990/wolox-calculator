import { Injectable } from '@angular/core';
import { CalculatorData } from '../classes/calculator-data';
import { ResultData } from '../classes/result-data';
import { BehaviorSubject } from 'rxjs';
import * as mathjs from 'mathjs';
import { LogDataService } from './log-data.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private calculatorDataBehaviorSubject = new BehaviorSubject<CalculatorData[]>([]);
  public calculatorDataObs = this.calculatorDataBehaviorSubject.asObservable();

  private resultDataBehaviorSubject = new BehaviorSubject<ResultData>(null);
  public resultDataObs = this.resultDataBehaviorSubject.asObservable();

  private degreesBehaviorSubject = new BehaviorSubject<boolean>(false);
  public degreesObs = this.degreesBehaviorSubject.asObservable();


  constructor(private logDataService: LogDataService) { }

  public newData(data: CalculatorData) {
    if (data.key === '=') {
      const currentKeys = this.calculatorDataBehaviorSubject.value;
      const keysArray = currentKeys.map((dataKey: CalculatorData) => {
        return dataKey.key;
      });
      const strCurrentKeys = keysArray.join('');
      let operationResult = '';
      try {
        operationResult = mathjs.eval(strCurrentKeys);
      } catch (error) {
        operationResult = '<div style="color: red">Error de sintaxis</div>';
      }
      const resultData = { result: operationResult, operation: currentKeys };
      this.resultDataBehaviorSubject.next(resultData);
      this.logDataService.saveLogData(resultData);

    } else if (data.key === 'C') {
      this.resultDataBehaviorSubject.next(null);
      this.calculatorDataBehaviorSubject.next([]);
    } else if (data.key === 'Deg') {
      this.degreesBehaviorSubject.next(true);
    } else if (data.key === 'Rad') {
      this.degreesBehaviorSubject.next(false);
    } else {
      this.calculatorDataBehaviorSubject.value.push(data);
      this.calculatorDataBehaviorSubject.next(this.calculatorDataBehaviorSubject.value);
    }
  }

  key2ViewValues(data: CalculatorData[]) {
    const viewValues = data.map((value, index) => {
      switch (value.key) {
        case 'tan':
          return 'tan(';
        case 'cos':
          return 'cos(';
        case 'sin':
          return 'sin(';
        case 'sqrt(':
          return '&radic;(';
        case 'e^(':
          return '&escr;^(';
        case '1/log(e)*log(':
          return 'ln(';
        case 'pi':
          return '&pi;';
        case 'e':
          return '&escr;';
        case '/':
          return '&divide;';
        case '*':
          return '&times;';
        case '+':
          return '&plus;';
        case '-':
          return '&minus;';
        default:
          return value.key;
      }
    });
    return viewValues.join('');
  }

}
