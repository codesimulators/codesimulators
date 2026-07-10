import { Ledger } from './Ledger';

export interface Transaction { from: string; to: string; amountCents: number; }

// Greedy minimum-cash-flow settlement: repeatedly match the largest debtor
// with the largest creditor. Provably minimal for netting a set of balances
// that already sums to zero.
export class SettlementService {
    simplify(ledger: Ledger): Transaction[] {
        const net = ledger.getNetBalances();
        let creditors: [string, number][] = [];
        let debtors: [string, number][] = [];
        for (const [id, amount] of net) {
            if (amount > 0) creditors.push([id, amount]);
            else if (amount < 0) debtors.push([id, -amount]);
        }

        const txns: Transaction[] = [];
        while (creditors.length && debtors.length) {
            creditors.sort((a, b) => b[1] - a[1]);
            debtors.sort((a, b) => b[1] - a[1]);

            const [creditor, due] = creditors[0];
            const [debtor, owed] = debtors[0];
            const amount = Math.min(due, owed);

            txns.push({ from: debtor, to: creditor, amountCents: amount });
            creditors[0][1] -= amount;
            debtors[0][1] -= amount;

            creditors = creditors.filter(([, amt]) => amt > 0);
            debtors = debtors.filter(([, amt]) => amt > 0);
        }
        return txns;
    }
}