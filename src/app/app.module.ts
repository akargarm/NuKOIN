import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { PriceComponent } from './price/price.component';
import { LineChartDemoComponent } from './charts/charts.component';
import { CryptoChartComponent } from './custom_charts/crypto_chart.component';
// import { PriceService } from './price/price.service';
import { RegistrationComponent } from './registration/registration.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    PriceComponent,
    LineChartDemoComponent,
    CryptoChartComponent
    // PriceService
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
