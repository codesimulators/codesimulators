// Strategy: turn (open requests, available drivers) in a zone into a price
// multiplier. Swappable independent of the matching logic itself.
public interface SurgeStrategy {
    double multiplier(int openRequests, int availableDrivers);
}