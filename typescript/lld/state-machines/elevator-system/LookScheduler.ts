import { Direction } from './Direction';

// The SCHEDULING POLICY, isolated from the car. It only ever sees floor
// numbers — not which are pickups, drop-offs, or which way a hall call wants
// to go; that distinction lives entirely in Elevator.
export interface Scheduler {
    add(floor: number): void;
    remove(floor: number): void;
    hasWork(): boolean;
    // Next floor to head toward, given where we are and which way we're going.
    next(current: number, dir: Direction): number | null;
}

export class LookScheduler implements Scheduler {
    private targets: number[] = [];   // kept sorted — no re-sorting on every call

    private lowerBound(floor: number): number {
        let lo = 0, hi = this.targets.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (this.targets[mid] < floor) lo = mid + 1; else hi = mid;
        }
        return lo;
    }

    add(floor: number): void {
        const i = this.lowerBound(floor);
        if (this.targets[i] !== floor) this.targets.splice(i, 0, floor);
    }
    remove(floor: number): void {
        const i = this.lowerBound(floor);
        if (this.targets[i] === floor) this.targets.splice(i, 1);
    }
    hasWork(): boolean { return this.targets.length > 0; }

    next(current: number, dir: Direction): number | null {
        const i = this.lowerBound(current);
        const below = i > 0 ? this.targets[i - 1] : null;                            // largest strictly < current
        const aboveIdx = this.targets[i] === current ? i + 1 : i;
        const above = aboveIdx < this.targets.length ? this.targets[aboveIdx] : null; // smallest strictly > current
        if (dir === Direction.DOWN) return below ?? above;
        return above ?? below;   // UP or IDLE: prefer continuing upward (LOOK)
    }
}