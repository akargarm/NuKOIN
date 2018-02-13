import { Component, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { CustomChartsService } from './custom_charts.service';
import { Observable } from 'rxjs/Observable';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'crypto-chart',
  templateUrl: './crypto_chart.component.html'
})

export class CryptoChartComponent implements OnInit {
  private _customChartsService;
  loaded: boolean;
  // private chartSelect: number = 0;
  private chartSelect: number;
  private timeFrame: number = 0;

  @ViewChild(BaseChartDirective)
  chart: BaseChartDirective;
  //Testing
  // thirtyDayData: Array<any> = [
  //     { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], label: "1M" }
  // ];

  // thirtyDayData: Array<any> = [
  //   { data: [], label: "1M" },
  //   { data: [], label: "3M" }
  // ];

  chartData: Array<any> = [
    { data: [], label: "" }
  ];

  thirtyDayData: Array<any> = [];
  ninetyDayData: Array<any> = [];
  sixMonthData: Array<any> = [];

  thirtyDayDataBTC: Array<any> = [];
  ninetyDayDataBTC: Array<any> = [];
  sixMonthDataBTC: Array<any> = [];

  // thirtyDayData: Array<any> = [
  //     { data: [], label: "" }
  // ];
  //
  // ninetyDayData: Array<any> = [
  //     { data: [], label: "" }
  // ];
  //
  // thirtyDayDataBTC: Array<any> = [
  //     { data: [], label: "" }
  // ];
  //
  // ninetyDayDataBTC: Array<any> = [
  //     { data: [], label: "" }
  // ];

  chartLabels: Array<any> = [];

  thirtyDayLineChartLabels: Array<any> = [];
  ninetyDayLineChartLabels: Array<any> = [];
  sixMonthLineChartLabels: Array<any> = [];

  loopLimitThirty: number = 30;

  loopLimitNinety: number = 90;

  loopLimitSixMonths: number = 180;

  errorMessage: string;

  //From charts example
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  constructor(_customChartsService: CustomChartsService) {
    this._customChartsService = _customChartsService;
    this.loaded = false;
    this.chartSelect = 0;
  }

  ngOnInit(): void {
    //getting line chart labels for 1M and 30 day ETH price data
    this._customChartsService.get30DayData()
      // .first()
      .subscribe(thirtyDayData => {
        for (var i = 0; i <= this.loopLimitThirty; i++) {
          this.thirtyDayLineChartLabels.push(thirtyDayData[i]['Time']);
          this.thirtyDayData.push(thirtyDayData[i]['Price']);
        }
      },
      error => this.errorMessage = <any>error);

    //getting line chart labels for 3M and 90 day ETH price data
    this._customChartsService.get90DayData()
      // .first()
      .subscribe(ninetyDayData => {
        for (var i = 0; i <= this.loopLimitNinety; i++) {
          this.ninetyDayLineChartLabels.push(ninetyDayData[i]['Time']);
          this.ninetyDayData.push(ninetyDayData[i]['Price']);
        }
        this.chartLabels = this.ninetyDayLineChartLabels;
        this.chartData[0].data = this.ninetyDayData;
        this.chartData[0].label = 'ETH';

        this.loaded = true;
      },
      error => this.errorMessage = <any>error);

      //getting line chart labels for 6M and 180 day ETH price data
      this._customChartsService.getSixMonthData()
        // .first()
        .subscribe(sixMonthData => {
          for (var i = 0; i <= this.loopLimitSixMonths; i++) {
            this.sixMonthLineChartLabels.push(sixMonthData[i]['Time']);
            this.sixMonthData.push(sixMonthData[i]['Price']);
          }
        },
        error => this.errorMessage = <any>error);

    //getting price data for 1M BTC
    this._customChartsService.get30DayDataBTC()
    // .first()
      .subscribe(thirtyDayDataBTC => {
        for (var i = 0; i <= this.loopLimitThirty; i++) {
          this.thirtyDayDataBTC.push(thirtyDayDataBTC[i]['Price']);
        }
      },
      error => this.errorMessage = <any>error);

    //getting price data for 3M BTC
    this._customChartsService.get90DayDataBTC()
    // .first()
      .subscribe(ninetyDayDataBTC => {
        for (var i = 0; i <= this.loopLimitNinety; i++) {
          this.ninetyDayDataBTC.push(ninetyDayDataBTC[i]['Price']);
        }
      },
      error => this.errorMessage = <any>error);

      //getting price data for 6M BTC
      this._customChartsService.getSixMonthDataBTC()
        // .first()
        .subscribe(sixMonthDataBTC => {
          for (var i = 0; i <= this.loopLimitSixMonths; i++) {
            this.sixMonthDataBTC.push(sixMonthDataBTC[i]['Price']);
          }
        },
        error => this.errorMessage = <any>error);
  }

  show1M(chartSelect: number): void {
    chartSelect = this.chartSelect;

    if (chartSelect == 0) {
      this.timeFrame = 1;
      this.chartLabels = this.thirtyDayLineChartLabels;
      this.chartData[0].data = this.thirtyDayData;
      this.chartData[0].label = 'ETH';
      this.chart.ngOnChanges({} as SimpleChanges);
    }

    else if (chartSelect == 1) {
      this.timeFrame = 1;
      this.chartLabels = this.thirtyDayLineChartLabels;
      this.chartData[0].data = this.thirtyDayDataBTC;
      this.chartData[0].label = 'BTC';
      this.chart.ngOnChanges({} as SimpleChanges);
    }
  }

  // show1M(chartSelect: number): void {
  //   this.loaded = false;
  //   this.chartLabels = [];
  //   chartSelect = this.chartSelect;
  //
  //   //getting line chart labels for 1M
  //   this._customChartsService.get30DayData()
  //     // .first()
  //     .subscribe(thirtyDayLineChartLabels => {
  //       for (var i = 0; i <= this.loopLimitThirty; i++) {
  //         this.chartLabels.push(thirtyDayLineChartLabels[i]['Time']);
  //         // console.log(thirtyDayLineChartLabels[i]['Time']);
  //       }
  //       // console.log(this.chartLabels);
  //     },
  //     error => this.errorMessage = <any>error);
  //
  //   if (chartSelect == 0) {
  //     //getting ETH price data for 1M
  //     this._customChartsService.get30DayData()
  //       .subscribe(thirtyDayData => {
  //         let data: Array<any> = new Array();
  //         for (var i = 0; i <= this.loopLimitThirty; i++) {
  //           data.push(thirtyDayData[i]['Price']);
  //         }
  //         this.loaded = true;
  //         this.timeFrame = 1;
  //         this.chartData[0].data = data;
  //         this.chartData[0].label = 'ETH';
  //         // console.log(data);
  //         // console.log(this.chartData);
  //       },
  //       error => this.errorMessage = <any>error);
  //   }
  //
  //   if (chartSelect == 1) {
  //     //getting BTC price data for 1M
  //     this._customChartsService.get30DayDataBTC()
  //       .subscribe(thirtyDayData => {
  //         let data: Array<any> = new Array();
  //         for (var i = 0; i <= this.loopLimitThirty; i++) {
  //           data.push(thirtyDayData[i]['Price']);
  //         }
  //         this.loaded = true;
  //         this.timeFrame = 1;
  //         this.chartData[0].data = data;
  //         this.chartData[0].label = 'BTC';
  //         // console.log(data);
  //         // console.log(this.chartData);
  //       },
  //       error => this.errorMessage = <any>error);
  //   }
  // }

  show3M(chartSelect: number): void {
    chartSelect = this.chartSelect;

    if (chartSelect == 0) {
          this.timeFrame = 0;
          this.chartLabels = this.ninetyDayLineChartLabels;
          this.chartData[0].data = this.ninetyDayData;
          this.chartData[0].label = 'ETH';
          this.chart.ngOnChanges({} as SimpleChanges);
    }

    else if (chartSelect == 1) {
        this.timeFrame = 0;
        this.chartLabels = this.ninetyDayLineChartLabels;
        this.chartData[0].data = this.ninetyDayDataBTC;
        this.chartData[0].label = 'BTC';
        this.chart.ngOnChanges({} as SimpleChanges);
    }
  }

  show6M(chartSelect: number): void {
    chartSelect = this.chartSelect;

    if (chartSelect == 0) {
          this.timeFrame = 2;
          this.chartLabels = this.sixMonthLineChartLabels;
          this.chartData[0].data = this.sixMonthData;
          this.chartData[0].label = 'ETH';
          this.chart.ngOnChanges({} as SimpleChanges);
    }

    else if (chartSelect == 1) {
        this.timeFrame = 2;
        this.chartLabels = this.sixMonthLineChartLabels;
        this.chartData[0].data = this.sixMonthDataBTC;
        this.chartData[0].label = 'BTC';
        this.chart.ngOnChanges({} as SimpleChanges);
    }
  }

  // show3M(chartSelect: number): void {
  //   this.loaded = false;
  //   this.chartLabels = [];
  //   chartSelect = this.chartSelect;
  //
  //   //getting line chart labels for 3M
  //   this._customChartsService.get90DayData()
  //     // .first()
  //     .subscribe(ninetyDayLineChartLabels => {
  //       for (var i = 0; i <= this.loopLimitNinety; i++) {
  //         this.chartLabels.push(ninetyDayLineChartLabels[i]['Time']);
  //         // console.log(ninetyDayLineChartLabels[i]['Time']);
  //       }
  //       // console.log(this.chartLabels);
  //     },
  //     error => this.errorMessage = <any>error);
  //
  //   if (chartSelect == 0) {
  //     //getting ETH price data for 3M
  //     this._customChartsService.get90DayData()
  //       .subscribe(ninetyDayData => {
  //         let data: Array<any> = new Array();
  //         for (var i = 0; i <= this.loopLimitNinety; i++) {
  //           data.push(ninetyDayData[i]['Price']);
  //         }
  //         this.loaded = true;
  //         this.timeFrame = 0;
  //         this.chartData[0].data = data;
  //         this.chartData[0].label = 'ETH';
  //         // console.log(data);
  //         // console.log(this.chartData);
  //       },
  //       error => this.errorMessage = <any>error);
  //   }
  //
  //   if (chartSelect == 1) {
  //     //getting BTC price data for 3M
  //     this._customChartsService.get90DayDataBTC()
  //       .subscribe(ninetyDayData => {
  //         let data: Array<any> = new Array();
  //         for (var i = 0; i <= this.loopLimitNinety; i++) {
  //           data.push(ninetyDayData[i]['Price']);
  //         }
  //         this.loaded = true;
  //         this.timeFrame = 0;
  //         this.chartData[0].data = data;
  //         this.chartData[0].label = 'BTC';
  //         // console.log(data);
  //         // console.log(this.chartData);
  //       },
  //       error => this.errorMessage = <any>error);
  //   }
  // }

  showBTCData(event: any): void {
    event.preventDefault();
    if (this.chartSelect == 0) {
      this.chartSelect = 1;
    }
    else if (this.chartSelect == 1) {
      this.chartSelect = 0;
    }

    if (this.timeFrame == 1) {
      this.show1M(this.chartSelect);
    }
    else if (this.timeFrame == 0) {
      this.show3M(this.chartSelect);
    }
    else if (this.timeFrame == 2) {
      this.show6M(this.chartSelect);
    }
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
