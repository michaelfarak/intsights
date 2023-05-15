import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { AggregationsByType } from "src/app/interfaces/aggregationsByType.interface";


@Component({
    selector: 'risk-types-table',
    templateUrl: './risk-types-table.component.html',
    styleUrls: ['./risk-types-table.component.scss'],
})

export class RiskTypesTableComponent {
    @Input() isDarkWeb: boolean;
    @Input() data: AggregationsByType

}