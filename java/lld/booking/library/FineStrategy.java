// Strategy: overdue fine rule is pluggable.
public interface FineStrategy {
    double compute(Loan loan, long returnedAt);
}

class PerDayFine implements FineStrategy {
    private final double perDay;
    public PerDayFine(double perDay) { this.perDay = perDay; }
    public double compute(Loan loan, long returnedAt) {
        long overdue = returnedAt - loan.dueAt;
        if (overdue <= 0) return 0;
        return (long) Math.ceil(overdue / 86_400_000.0) * perDay;
    }
}