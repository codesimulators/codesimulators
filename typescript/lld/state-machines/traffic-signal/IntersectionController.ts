import { SignalColor } from './SignalColor';
import { TrafficLight } from './TrafficLight';

// Two lights, one invariant: NS and EW are never GREEN/YELLOW at once.
// When one light turns RED, the crossing one is released to GREEN.
export class IntersectionController {
    private ns = new TrafficLight(SignalColor.GREEN);
    private ew = new TrafficLight(SignalColor.RED);

    // The safety invariant, asserted every tick.
    private safe(): boolean {
        const go = (c: SignalColor) => c !== SignalColor.RED;
        return !(go(this.ns.getColor()) && go(this.ew.getColor()));
    }

    tick(dt: number): void {
        // Only the currently-flowing axis is "live"; the other holds RED until
        // its partner completes RED, keeping the crossing mutually exclusive.
        const nsGo = this.ns.getColor() !== SignalColor.RED;
        const live = nsGo ? this.ns : this.ew;
        const idle = nsGo ? this.ew : this.ns;

        const changed = live.tick(dt);
        if (changed === SignalColor.RED) {
            idle.forceTo(SignalColor.GREEN);   // hand the crossing over
        }
        if (!this.safe()) throw new Error('INVARIANT VIOLATED: both axes flowing');
    }

    state(): string {
        return `NS=${this.ns.getColor()}  EW=${this.ew.getColor()}`;
    }
}