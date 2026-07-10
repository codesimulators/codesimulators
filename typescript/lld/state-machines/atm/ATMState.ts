import { ATM } from './ATM';

// The state interface: every action the machine exposes. The abstract base
// gives each a default of "not allowed here", so a concrete state only
// overrides the actions that are LEGAL in its mode — the rest self-reject.
export abstract class ATMState {
    constructor(protected atm: ATM) {}

    insertCard(): void { this.reject('insert card'); }
    enterPin(_pin: string): void { this.reject('enter PIN'); }
    withdraw(_amount: number): void { this.reject('withdraw'); }
    ejectCard(): void { this.reject('eject card'); }

    abstract name(): string;

    protected reject(action: string): void {
        console.log(`  ✗ cannot ${action} while ${this.name()}`);
    }
}