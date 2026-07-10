import type { State } from './State';
import { IdleState } from './IdleState';

export interface Product { price: number; stock: number }

// The CONTEXT. Holds the data + the current state object, and delegates every
// public action to it. One lock point (a mutex) makes the whole machine safe.
export class VendingMachine {
    private state: State = new IdleState();
    balance = 0;
    selected: string | null = null;
    products: Record<string, Product>;

    constructor(products: Record<string, Product>) {
        this.products = products;
    }

    setState(s: State): void { this.state = s; }
    returnChange(cents: number): void { console.log(`return ${cents}c`); }

    // Public API — pure delegation. No if/else on state anywhere.
    insertCoin(cents: number): void { this.state.insertCoin(this, cents); }
    selectProduct(id: string): void { this.state.selectProduct(this, id); }
    dispense(): void { this.state.dispense(this); }
    refund(): void { this.state.refund(this); }
}