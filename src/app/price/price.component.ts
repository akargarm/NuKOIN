import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PriceService } from './price.service';
import { Price } from './price.model';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/first';

@Component({
  selector: 'price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})

export class PriceComponent implements OnInit {
  private _priceService;

  // priceData: any[];
  ethPriceData: Array<any[]> = [];
  btcPriceData: Array<any[]> = [];

  ethHistoricalData: Array<any[]> = [];
  // ethPrice: Price;
  errorMessage: string;
  priceTest = 'PriceComponent works!';
  alive: boolean;

  constructor(_priceService: PriceService) {
    this._priceService = _priceService;
    this.alive = true;
  }

  ngOnInit(): void {
    this._priceService.getEthPrice()
      .first() // only fires once
      .subscribe(priceData => {
        this.ethPriceData.push(priceData);
        console.log(this.ethPriceData);
      },
      error => this.errorMessage = <any>error);
    this._priceService.getBtcPrice()
      .first() // only fires once
      .subscribe(priceData => {
        this.btcPriceData.push(priceData);
        console.log(this.btcPriceData);
      },
      error => this.errorMessage = <any>error);
    this._priceService.getEthHistorical()
      .first()
      .subscribe(histData => {
        this.ethHistoricalData.push(histData);
        console.log(this.ethHistoricalData);
      },
      error => this.errorMessage = <any>error);
    IntervalObservable.create(10000)
      .takeWhile(() => this.alive) // only fires when component is alive
      .subscribe(() => {
        this._priceService.getEthPrice()
          .subscribe(priceData => {
            this.ethPriceData.length = 0;
            this.ethPriceData.push(priceData);
          });
      });
    IntervalObservable.create(10000)
      .takeWhile(() => this.alive) // only fires when component is alive
      .subscribe(() => {
        this._priceService.getBtcPrice()
          .subscribe(priceData => {
            this.btcPriceData.length = 0;
            this.btcPriceData.push(priceData);
          });
      });
  }

  // getPriceUpdates(): void {
  //   this._priceService.getEthPrice()
  //   .first()
  //     .subscribe(priceData => {
  //       this.priceData.push(priceData);
  //       console.log(this.priceData);
  //     },
  //     error => this.errorMessage = <any>error);
  //     IntervalObservable.create(5000)
  //       .takeWhile(() => this.alive) // only fires when component is alive
  //       .subscribe(() => {
  //         this._priceService.getEthPrice()
  //           .subscribe(priceData => {
  //             this.priceData = priceData;
  //           });
  //       });
  // }
  // createPriceArray(): void {
  //     this.priceData = Object.keys(this.ethPrice);
  //     console.log(this.priceData);
  // }
}
