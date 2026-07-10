import { ATMState } from './ATMState';
import { IdleState } from './IdleState';
import { AuthenticatedState } from './AuthenticatedState';

// Card is in. Enter a PIN (three tries) or eject. Can't withdraw yet.
export class HasCardState extends ATMState {
    private tries = 0;
    name() { return 'HAS_CARD'; }

    enterPin(pin: string): void {
        if (this.atm.validatePin(pin)) {
            console.log('  → PIN ok, authenticated');
            this.atm.setState(new AuthenticatedState(this.atm));
        } else if (++this.tries >= 3) {
            console.log('  ✗ 3 wrong PINs — card retained');
            this.atm.setState(new IdleState(this.atm));
        } else {
            console.log(`  ✗ wrong PIN (${this.tries}/3)`);
        }
    }

    ejectCard(): void {
        console.log('  → card returned');
        this.atm.setState(new IdleState(this.atm));
    }
}