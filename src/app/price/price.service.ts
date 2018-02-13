import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Price } from './price.model';

@Injectable()
export class PriceService {
  private _ethPriceUrl = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ETH,USD,EUR';
  private _btcPriceUrl = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=BTC,USD,EUR';

  private _ethHistoricalUrl = 'https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=30&aggregate=1&e=CCCAGG';

  // priceData: Array<any[]> = [];

  errorMessage: string;

  constructor(private _http: HttpClient) {

  }

  // getEthPrice(): Observable<Price[]> {
  //     return this._http.get<Price[]>(this._ethPriceUrl)
  //     .do(data => console.log("ETH price: " + JSON.stringify(data)))
  //     .catch(this.handleError);
  // }

  getEthPrice(): Observable<any[]> {
    return this._http.get(this._ethPriceUrl)
      .map((resp: Response) => resp)
      .do(data => console.log("ETH price: " + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getBtcPrice(): Observable<any[]> {
    return this._http.get(this._btcPriceUrl)
      .map((resp: Response) => resp)
      .do(data => console.log("BTC price: " + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getEthHistorical(): Observable<any[]> {
      return this._http.get(this._ethHistoricalUrl)
      .map((resp: Response) => resp)
      .do(data => console.log("Historical ETH prices: " + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }

}
