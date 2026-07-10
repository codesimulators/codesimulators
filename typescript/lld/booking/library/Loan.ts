// The reservation record: which copy, which member, when it's due.
export class Loan {
    returnedAt: number | null = null;
    fine = 0;
    constructor(
        public readonly id: string,
        public readonly barcode: string,
        public readonly memberId: string,
        public readonly borrowedAt: number,
        public readonly dueAt: number,
    ) {}
}