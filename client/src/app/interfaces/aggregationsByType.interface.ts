import { NetworkType } from "./networkType.interface";

export interface AggregationsByType {
    AttackIndication: NetworkType;
    BrandSecurity: NetworkType;
    DataLeakage: NetworkType;
    ExploitableData: NetworkType;
    Phishing: NetworkType;
    vip: NetworkType;
}

