import { Direction, DoorState } from './Direction';
import { Scheduler } from './LookScheduler';

const TICK_MS = 100;   // pacing only — one atomic action settles every 100ms

// The FSM context. It never decides WHICH floor to serve, or whether a hall
// call matches the direction it's heading — those live here, not in the
// scheduler. It only asks the scheduler where to go next. Nobody outside
// this class ever drives it directly: requestPickup/selectDestination wake
// an internal timer loop that keeps ticking until the car settles.
export class Elevator {
    private floor = 0;
    private direction = Direction.IDLE;
    private door = DoorState.CLOSED;
    private calls = new Map<number, Direction>();   // hall calls: floor → requested direction
    private destinations = new Set<number>();       // car calls: where a boarded rider is headed
    private boarding: number | null = null;         // floor where a rider just got on, awaiting a pick
    private driving = false;                        // is the internal tick loop already running?

    constructor(private scheduler: Scheduler) {}

    // A hall call: someone waiting at `floor`, wanting to go `direction`.
    requestPickup(floor: number, direction: Direction): void {
        this.calls.set(floor, direction);
        this.scheduler.add(floor);
        this.wake();
    }

    // A car call: a boarded rider's actual destination.
    selectDestination(floor: number): void {
        this.destinations.add(floor);
        this.scheduler.add(floor);
        this.boarding = null;
        this.wake();
    }

    // Starts the car ticking on its own if it isn't already — the only thing
    // a request does to make the car move.
    private wake(): void {
        if (this.driving) return;
        this.driving = true;
        setTimeout(() => this.tick(), TICK_MS);
    }

    private tick(): void {
        console.log(this.step());
        const waitingOnRider = this.boarding !== null;
        const settled = this.direction === Direction.IDLE && this.door === DoorState.CLOSED
            && this.calls.size === 0 && this.destinations.size === 0;
        if (waitingOnRider || settled) { this.driving = false; return; }   // nothing to do until woken again
        setTimeout(() => this.tick(), TICK_MS);
    }

    // One atomic action: move a floor, open/close a door, or go idle.
    private step(): string {
        if (this.boarding !== null) return `floor ${this.floor}: boarding, awaiting destination`;
        if (this.door === DoorState.OPEN) {           // doors were open last tick
            this.door = DoorState.CLOSED;
            return `floor ${this.floor}: doors closed`;
        }

        const hallDir = this.calls.get(this.floor);
        const hallMatches = hallDir !== undefined && (this.direction === Direction.IDLE || hallDir === this.direction);
        const destHere = this.destinations.has(this.floor);

        if (hallMatches || destHere) {
            if (hallMatches) { this.calls.delete(this.floor); this.scheduler.remove(this.floor); this.boarding = this.floor; }
            if (destHere) { this.destinations.delete(this.floor); this.scheduler.remove(this.floor); }
            this.door = DoorState.OPEN;
            return `floor ${this.floor}: doors OPEN${hallMatches ? ', boarding' : ', dropped off'}`;
        }
        // a mismatched hall call (wants DOWN while we're headed UP, say) is
        // simply left pending — it'll match once the car reverses

        const target = this.scheduler.next(this.floor, this.direction);
        if (target === null) {
            this.direction = Direction.IDLE;
            return `floor ${this.floor}: idle`;
        }

        const nextDirection = target > this.floor ? Direction.UP : Direction.DOWN;
        if (nextDirection !== this.direction && this.direction !== Direction.IDLE) {
            // Reversing: settle the new direction but don't move yet, so the
            // very next tick re-checks hallMatches against it — otherwise the
            // car can sail straight past a floor it should've stopped at.
            this.direction = nextDirection;
            return `floor ${this.floor}: reversing to ${nextDirection}`;
        }
        this.direction = nextDirection;
        this.floor += this.direction === Direction.UP ? 1 : -1;   // move one floor
        return `reached floor ${this.floor}`;
    }

    get state(): string { return `[${this.floor}, ${this.direction}, ${this.door}]`; }
}