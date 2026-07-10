import { Recipe } from './Recipe';

// The resource guard. canMake() decides whether a transition is even allowed;
// consume() is only called once a brew actually commits.
export class Inventory {
    constructor(private stock: Record<string, number>) {}

    canMake(r: Recipe): boolean {
        return Object.entries(r.needs).every(([ing, qty]) => (this.stock[ing] ?? 0) >= qty);
    }

    missing(r: Recipe): string[] {
        return Object.entries(r.needs)
            .filter(([ing, qty]) => (this.stock[ing] ?? 0) < qty)
            .map(([ing]) => ing);
    }

    consume(r: Recipe): void {
        for (const [ing, qty] of Object.entries(r.needs)) this.stock[ing] -= qty;
    }

    refill(ing: string, qty: number): void { this.stock[ing] = (this.stock[ing] ?? 0) + qty; }
}