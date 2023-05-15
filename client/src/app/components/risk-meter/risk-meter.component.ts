import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'risk-meter',
  templateUrl: './risk-meter.component.html',
  styleUrls: ['./risk-meter.component.scss']
})
export class RiskMeterComponent implements OnChanges {
    @Input('percentage') percentage = 0;

    value: number = this.percentage;

    ngOnChanges({ percentage }: SimpleChanges): void {
        if (Number.isInteger(percentage.currentValue)) {
            setTimeout(() => {
                this.value = percentage.currentValue;
            });
        }
    }
}
