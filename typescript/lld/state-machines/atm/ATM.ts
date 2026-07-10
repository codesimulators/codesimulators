import { ATMState } from './ATMState';
import { IdleState } from './IdleState';

// The CONTEXT. Holds the current state + machine data, and forwards every
// action to the state. It never asks "what state am I in?" — it just delegates.
export class ATM {
    private state: ATMState;
    private balance = 800;      // demo account balance
    private cash: number;       // notes physically in the machine
    private readonly pin = '1234';

    constructor(cash = 500) {
        this.cash = cash;
        this.state = new IdleState(this);
    }

    setState(s: ATMState): void { this.state = s; }
    getBalance(): number { return this.balance; }
    getCash(): number { return this.cash; }
    validatePin(pin: string): boolean { return pin === this.pin; }
    debit(n: number): void { this.balance -= n; }
    dispense(n: number): void { this.cash -= n; }

    // Public API — pure delegation. No conditionals about the mode.
    insertCard(): void { this.log('insertCard'); this.state.insertCard(); }
    enterPin(pin: string): void { this.log('enterPin'); this.state.enterPin(pin); }
    withdraw(n: number): void { this.log(`withdraw ${n}`); this.state.withdraw(n); }
    ejectCard(): void { this.log('ejectCard'); this.state.ejectCard(); }

    private log(a: string): void { console.log(`[${this.state.name()}] ${a}()`); }
}