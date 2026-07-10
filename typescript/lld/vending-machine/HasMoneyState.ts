import { State } from './State';
import { VendingMachine } from './VendingMachine';
import { IdleState } from './IdleState';
import { DispensingState } from './DispensingState';

// Money is in. Take more coins, or try to select a product.
export class HasMoneyState extends State {
    name() { return 'HAS_MONEY'; }

    insertCoin(m: VendingMachine, cents: number): void { m.balance += cents; }

    selectProduct(m: VendingMachine, id: string): void {
        const p = m.products[id];
        if (!p || p.stock === 0) return;
        if (m.balance < p.price) return;
        m.selected = id;
        m.setState(new DispensingState());
    }

    // dispense — inherited reject handles it

    refund(m: VendingMachine): void {
        m.returnChange(m.balance);
        m.balance = 0;
        m.setState(new IdleState());
    }
}