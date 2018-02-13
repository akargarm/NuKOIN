import { Component } from '@angular/core';
import { PriceService } from './price/price.service';
import { LineChartDemoComponent } from './charts/charts.component';
import { CustomChartsService } from './custom_charts/custom_charts.service';
// import { RegistrationComponent } from './registration/registration.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PriceService, CustomChartsService]
})
export class AppComponent {
  title = 'NuKOIN';
}
