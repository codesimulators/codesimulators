// Strategy: turn (open requests, available drivers) in a zone into a price
// multiplier. Swappable independent of the matching logic itself.
export interface SurgeStrategy {
    multiplier(openRequests: number, availableDrivers: number): number;
}