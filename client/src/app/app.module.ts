import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { ChartsModule, ThemeService } from 'ng2-charts';

import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { RiskMeterComponent } from './components/risk-meter/risk-meter.component';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RiskTypesTableComponent } from './components/risk-types-table/risk-types-table.component';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    RiskMeterComponent,
    DoughnutChartComponent,
    RiskTypesTableComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
