import { Expense } from './Expense';
import { Ledger } from './Ledger';
import { SettlementService, Transaction } from './SettlementService';
import { Split } from './Split';

// Facade — the only class callers touch. Coordinates users, the ledger and
// the settlement algorithm; owns no business logic of its own.
export class Group {
    private ledger = new Ledger();
    private settlement = new SettlementService();
    private nextId = 1;

    addExpense(paidBy: string, totalCents: number, participantIds: string[], split: Split): Expense {
        const expense = new Expense(`e${this.nextId++}`, paidBy, totalCents, participantIds, split);
        this.ledger.record(expense);
        return expense;
    }

    getBalances(): Map<string, number> {
        return this.ledger.getNetBalances();
    }

    simplifyDebts(): Transaction[] {
        return this.settlement.simplify(this.ledger);
    }
}