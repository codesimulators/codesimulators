// A drink is DATA: its price and how much of each ingredient it needs.
// Adding "Mocha" is a new entry here — no machine code changes.
export interface Recipe {
    name: string;
    priceCents: number;
    needs: Record<string, number>;   // ingredient -> units
}

export const MENU: Record<string, Recipe> = {
    espresso:   { name: 'Espresso',   priceCents: 200, needs: { beans: 2, water: 1 } },
    cappuccino: { name: 'Cappuccino', priceCents: 320, needs: { beans: 2, water: 1, milk: 2 } },
    latte:      { name: 'Latte',      priceCents: 350, needs: { beans: 2, water: 1, milk: 3 } },
};