import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { DoughnutLabel } from './doughnut-chart.model';

@Component({
  selector: 'doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnChanges {
    @Input() data: number[] = [];

    dataSets = [{
        data: this.data,
        backgroundColor: [
            '#D24346',
            '#F0AC38',
            '#4BAFD2'
        ],
        borderWidth: 0,
    }];
    dataLabel: DoughnutLabel[] = Object.values(DoughnutLabel);
    doughnutChartType: ChartType = 'doughnut';
    options: ChartOptions = {
        cutoutPercentage: 85,
        legend: {
            display: false,
        },
        tooltips: {
            bodyFontSize: 25,
            displayColors: false
        }
    };

    ngOnChanges({ data }: SimpleChanges) {
        if (data && data.currentValue) {
            this.dataSets[0].data = data.currentValue;
        }
    }
}
