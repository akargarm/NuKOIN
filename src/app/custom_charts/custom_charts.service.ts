import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class CustomChartsService {
    private _thirtyDayChartLabelsUrl = 'http://localhost:5000/30_day_labels/';
    private _ninetyDayChartLabelsUrl = 'http://localhost:5000/90_day_labels/';
    private _sixMonthChartLabelsUrl = 'http://localhost:5000/180_day_labels/';

    private _thirtyDayDataUrl = 'http://localhost:5000/30_day_data/';
    private _ninetyDayDataUrl = 'http://localhost:5000/90_day_data/';
    private _sixMonthDataUrl = 'http://localhost:5000/180_day_data/';

    private _thirtyDayDataUrlBTC = 'http://localhost:5000/30_day_data_btc/';
    private _ninetyDayDataUrlBTC = 'http://localhost:5000/90_day_data_btc/';
    private _sixMonthDataUrlBTC = 'http://localhost:5000/180_day_data_btc/';

    errorMessage: string;

    constructor(private _http: HttpClient) {

    }

    get30DayChartLabels(): Observable<any[]> {
        return this._http.get<any[]>(this._thirtyDayChartLabelsUrl)
        .do(data => console.log("30 day chart labels: " + JSON.stringify(data)))
        .catch(this.handleError);
    }

    get30DayData(): Observable<any[]> {
        return this._http.get(this._thirtyDayDataUrl)
        .map((resp: Response) => resp)
        .do(data => console.log("30 day data: " + JSON.stringify(data)))
        .catch(this.handleError);
    }

    get30DayDataBTC(): Observable<any[]> {
        return this._http.get(this._thirtyDayDataUrlBTC)
        .map((resp: Response) => resp)
        .do(data => console.log("30 day data BTC: " + JSON.stringify(data)))
        .catch(this.handleError);
    }

    get90DayChartLabels(): Observable<any[]> {
        return this._http.get<any[]>(this._ninetyDayChartLabelsUrl)
        .do(data => console.log("90 day chart labels: " + JSON.stringify(data)))
        .catch(this.handleError);
    }

    get90DayData(): Observable<any[]> {
        return this._http.get(this._ninetyDayDataUrl)
        .map((resp: Response) => resp)
        .do(data => console.log("90 day data: " + JSON.stringify(data)))
        .catch(this.handleError);
    }

    get90DayDataBTC(): Observable<any[]> {
        return this._http.get(this._ninetyDayDataUrlBTC)
        .map((resp: Response) => resp)
        .do(data => console.log("90 day data BTC: " + JSON.stringify(data)))
        .catch(this.handleError);
    }

    getSixMonthChartLabels(): Observable<any[]> {
        return this._http.get<any[]>(this._sixMonthChartLabelsUrl)
        .do(data => console.log("6 month chart labels: " + JSON.stringify(data)))
        .catch(this.handleError);
    }

    getSixMonthData(): Observable<any[]> {
        return this._http.get(this._sixMonthDataUrl)
        .map((resp: Response) => resp)
        .do(data => console.log("6 month data: " + JSON.stringify(data)))
        .catch(this.handleError);
    }

    getSixMonthDataBTC(): Observable<any[]> {
        return this._http.get(this._sixMonthDataUrlBTC)
        .map((resp: Response) => resp)
        .do(data => console.log("6 month data BTC: " + JSON.stringify(data)))
        .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
      console.log(err.message);
      return Observable.throw(err.message);
    }
}
