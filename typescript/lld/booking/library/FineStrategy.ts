import { Loan } from './Loan';

// Strategy: overdue fine rule is pluggable.
export interface FineStrategy {
    compute(loan: Loan, returnedAt: number): number;
}

export class PerDayFine implements FineStrategy {
    constructor(private readonly perDay: number) {}
    compute(loan: Loan, returnedAt: number): number {
        const overdueMs = returnedAt - loan.dueAt;
        if (overdueMs <= 0) return 0;
        return Math.ceil(overdueMs / 86_400_000) * this.perDay;   // ms -> days
    }
}