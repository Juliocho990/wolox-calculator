import { Injectable } from '@angular/core';
import { ResultData } from '../classes/result-data';

@Injectable({
  providedIn: 'root'
})
export class LogDataService {

  currentLogData: ResultData[];

  constructor() {
    this.currentLogData = JSON.parse(localStorage.getItem('logData')) as ResultData[];
    if (!this.currentLogData) {
      localStorage.setItem('logData', JSON.stringify([]));
    }
  }


  saveLogData(data: ResultData) {
    this.currentLogData = JSON.parse(localStorage.getItem('logData')) as ResultData[];
    this.currentLogData.push(data);
    localStorage.setItem('logData', JSON.stringify(this.currentLogData));
  }

  getLogData() {
    this.currentLogData = JSON.parse(localStorage.getItem('logData')) as ResultData[];
    return this.currentLogData;
  }
}
