import { Driver } from './Driver';

// A coarse geohash-lite: bucket drivers into 0.01-degree grid cells so a
// lookup only scans the rider's cell + its 8 neighbours, never the whole
// driver table.
export class GeoIndex {
    private cellSize = 0.01;
    private cells = new Map<string, Set<string>>();
    private driverCell = new Map<string, string>();

    private keyFor(lat: number, lng: number): string {
        return `${Math.floor(lat / this.cellSize)}:${Math.floor(lng / this.cellSize)}`;
    }

    upsert(driver: Driver): void {
        const key = this.keyFor(driver.lat, driver.lng);
        const prev = this.driverCell.get(driver.id);
        if (prev === key) return;
        if (prev) this.cells.get(prev)?.delete(driver.id);
        if (!this.cells.has(key)) this.cells.set(key, new Set());
        this.cells.get(key)!.add(driver.id);
        this.driverCell.set(driver.id, key);
    }

    nearbyDriverIds(lat: number, lng: number): string[] {
        const [cx, cy] = this.keyFor(lat, lng).split(':').map(Number);
        const ids: string[] = [];
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const cell = this.cells.get(`${cx + dx}:${cy + dy}`);
                if (cell) ids.push(...cell);
            }
        }
        return ids;
    }
}