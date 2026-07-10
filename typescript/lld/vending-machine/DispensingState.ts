import { State } from './State';
import { VendingMachine } from './VendingMachine';
import { IdleState } from './IdleState';

// Busy vending. Reject new input; only dispense() completes the sale.
export class DispensingState extends State {
    name() { return 'DISPENSING'; }

    insertCoin(m: VendingMachine, cents: number): void { m.returnChange(cents); }

    // selectProduct — inherited reject handles it

    dispense(m: VendingMachine): void {
        const p = m.products[m.selected!];
        p.stock -= 1;
        const change = m.balance - p.price;
        if (change > 0) m.returnChange(change);
        m.balance = 0;
        m.selected = null;
        m.setState(new IdleState());
    }

    // refund — inherited reject handles it
}