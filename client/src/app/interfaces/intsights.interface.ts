import { AggregationsByType } from "./aggregationsByType.interface";
import { NetworkType } from "./networkType.interface";

export interface Intsights {
    filteredAggregations: FilteredAggregations;
    riskMeter: number;
    uniqueSourceTypes: string[];
}

interface FilteredAggregations {
    aggregationsByType: AggregationsByType;
    aggregationsBySeverity: AggregationsBySeverity;
}

interface AggregationsBySeverity {
    High: NetworkType;
    Medium: NetworkType;
    Low: NetworkType;
}