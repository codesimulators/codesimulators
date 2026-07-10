// Strategy: pricing is pluggable without touching the lot.
public interface FeeStrategy {
    double compute(long entryTime, long exitTime);
}

class HourlyFeeStrategy implements FeeStrategy {
    private final double ratePerHour;
    public HourlyFeeStrategy(double ratePerHour) { this.ratePerHour = ratePerHour; }

    public double compute(long entryTime, long exitTime) {
        long hours = (long) Math.ceil((exitTime - entryTime) / 3_600_000.0);
        return Math.max(1, hours) * ratePerHour;   // min 1 hour
    }
}