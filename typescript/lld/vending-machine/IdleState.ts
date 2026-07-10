import { State } from './State';
import { VendingMachine } from './VendingMachine';
import { HasMoneyState } from './HasMoneyState';

// Waiting for the first coin. Only inserting money does anything here.
export class IdleState extends State {
    name() { return 'IDLE'; }

    insertCoin(m: VendingMachine, cents: number): void {
        m.balance += cents;
        m.setState(new HasMoneyState());
    }

    // selectProduct, dispense, refund — inherited reject handles them
}