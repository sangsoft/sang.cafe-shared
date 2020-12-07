export declare type StatValue = string | number | boolean | Date | {
    [key: string]: StatValue;
};
export declare type StatPeriod = 'monthly' | 'weekly';
export interface IStatistics {
    from: Date;
    to: Date;
    createdAt: Date;
    totalBillCount: number;
    totalPaidBillCount: number;
    averagePaidBillPerday: number;
    totalIncome: number;
    averageIncomePerDay: number;
    totalRestaurantCount: number;
    averageRestaurantPerDay: number;
    [key: string]: StatValue;
}
