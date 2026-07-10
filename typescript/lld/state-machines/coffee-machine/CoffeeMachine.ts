import { Recipe, MENU } from './Recipe';
import { Inventory } from './Inventory';

export enum State { IDLE = 'IDLE', SELECTED = 'SELECTED', PAID = 'PAID' }

// The FSM. Each public method is a guarded transition; a failed guard leaves
// the state unchanged and, if money was taken, refunds it.
export class CoffeeMachine {
    private state = State.IDLE;
    private selected: Recipe | null = null;
    private paidCents = 0;

    constructor(private inventory: Inventory) {}

    // IDLE -> SELECTED, guarded by stock. No stock => stay IDLE.
    select(key: string): string {
        if (this.state !== State.IDLE) return this.deny('select');
        const recipe = MENU[key];
        if (!recipe) return 'no such drink';
        if (!this.inventory.canMake(recipe))
            return `out of: ${this.inventory.missing(recipe).join(', ')}`;   // guard fails
        this.selected = recipe;
        this.state = State.SELECTED;
        return `selected ${recipe.name} — insert ${recipe.priceCents}c`;
    }

    // SELECTED -> PAID, guarded by amount. Overpay is change; underpay waits.
    pay(cents: number): string {
        if (this.state !== State.SELECTED) return this.deny('pay');
        this.paidCents += cents;
        if (this.paidCents < this.selected!.priceCents)
            return `need ${this.selected!.priceCents - this.paidCents}c more`;
        this.state = State.PAID;
        return 'payment ok — press brew';
    }

    // PAID -> BREWING -> IDLE. Re-checks stock; if it slipped, REFUND.
    brew(): string {
        if (this.state !== State.PAID) return this.deny('brew');
        const r = this.selected!;
        if (!this.inventory.canMake(r)) return this.refund('ingredient ran out');
        this.inventory.consume(r);                     // commit the resource
        const change = this.paidCents - r.priceCents;
        this.reset();
        return `brewed ${r.name}. change: ${change}c`;
    }

    // Cancel from any paid-ish state returns the money.
    cancel(): string {
        if (this.paidCents > 0) return this.refund('cancelled');
        this.reset();
        return 'cancelled';
    }

    private refund(reason: string): string {
        const amt = this.paidCents;
        this.reset();
        return `${reason} — refunded ${amt}c`;
    }
    private deny(action: string): string { return `cannot ${action} while ${this.state}`; }
    private reset(): void { this.state = State.IDLE; this.selected = null; this.paidCents = 0; }
    getState(): State { return this.state; }
}