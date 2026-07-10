import type { VendingMachine } from './VendingMachine';

// The contract every state must honour. Each action defaults to
// "not allowed here", so a concrete state overrides only its LEGAL actions.
export abstract class State {
    insertCoin(m: VendingMachine, cents: number): void  { this.reject('insert coin'); }
    selectProduct(m: VendingMachine, id: string): void  { this.reject('select product'); }
    dispense(m: VendingMachine): void                   { this.reject('dispense'); }
    refund(m: VendingMachine): void                     { this.reject('refund'); }

    abstract name(): string;

    protected reject(action: string): void {
        console.log(`  x cannot ${action} while ${this.name()}`);
    }
}