import { ATMState } from './ATMState';
import { HasCardState } from './HasCardState';

// Nothing in the machine; the only legal move is to insert a card.
export class IdleState extends ATMState {
    name() { return 'IDLE'; }

    insertCard(): void {
        console.log('  → card accepted');
        this.atm.setState(new HasCardState(this.atm));
    }
}