import { SurgeStrategy } from './SurgeStrategy';

export class DemandSupplySurge implements SurgeStrategy {
    multiplier(openRequests: number, availableDrivers: number): number {
        if (availableDrivers === 0) return 3.0;              // cap even with zero supply
        const ratio = openRequests / availableDrivers;
        return Math.min(3.0, Math.max(1.0, ratio));           // 1.0x floor, 3.0x cap
    }
}