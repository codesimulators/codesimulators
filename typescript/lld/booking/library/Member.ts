import { Loan } from './Loan';

export class Member {
    readonly loans: Loan[] = [];
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly maxBooks = 5,   // borrowing limit
    ) {}

    atLimit(): boolean { return this.loans.length >= this.maxBooks; }
}