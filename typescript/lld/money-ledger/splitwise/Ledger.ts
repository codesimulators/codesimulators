import { Expense } from './Expense';

// Append-only. Net balance is NEVER stored — it's derived by replaying the
// log, so it can never drift out of sync with the history that produced it.
export class Ledger {
    private expenses: Expense[] = [];

    record(expense: Expense): void {
        this.expenses.push(expense);
    }

    getNetBalances(): Map<string, number> {
        const net = new Map<string, number>();
        const bump = (id: string, delta: number) => net.set(id, (net.get(id) ?? 0) + delta);

        for (const e of this.expenses) {
            bump(e.paidBy, e.totalCents);                // paid the whole bill
            for (const [participant, share] of e.shares) {
                bump(participant, -share);                 // owes their share
            }
        }
        return net;
    }

    history(): readonly Expense[] {
        return this.expenses;
    }
}