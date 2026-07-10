import { SignalColor } from './SignalColor';
import { TRANSITIONS } from './TransitionTable';

// One light = current colour + how long it has held. tick(dt) advances the
// clock; the GUARD (elapsed >= holdSec) blocks any early transition, so you
// can never flip GREEN→RED skipping YELLOW.
export class TrafficLight {
    private color: SignalColor;
    private elapsed = 0;

    constructor(start: SignalColor = SignalColor.RED) {
        this.color = start;
    }

    getColor(): SignalColor { return this.color; }

    // Advance by dt seconds. Returns the NEW colour if it transitioned.
    tick(dt: number): SignalColor | null {
        this.elapsed += dt;
        const phase = TRANSITIONS[this.color];
        if (this.elapsed < phase.holdSec) return null;   // guard: hold time not met
        this.color = phase.next;                          // table-driven transition
        this.elapsed = 0;
        return this.color;
    }

    // Force to a colour (used by the controller to keep two lights in phase).
    forceTo(color: SignalColor): void {
        this.color = color;
        this.elapsed = 0;
    }
}