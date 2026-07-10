import { ATMState } from './ATMState';
import { IdleState } from './IdleState';

// Authenticated. Withdraw (guarded by balance AND cash on hand) or eject.
// The dispense is a brief transient step before returning to IDLE.
export class AuthenticatedState extends ATMState {
    name() { return 'AUTHENTICATED'; }

    withdraw(amount: number): void {
        if (amount > this.atm.getBalance()) {
            console.log('  ✗ insufficient funds'); return;
        }
        if (amount > this.atm.getCash()) {
            console.log('  ✗ machine is low on cash'); return;
        }
        this.atm.debit(amount);
        this.atm.dispense(amount);          // transient DISPENSING step
        console.log(`  → dispensed $${amount}, card returned`);
        this.atm.setState(new IdleState(this.atm));
    }

    ejectCard(): void {
        console.log('  → card returned');
        this.atm.setState(new IdleState(this.atm));
    }
}