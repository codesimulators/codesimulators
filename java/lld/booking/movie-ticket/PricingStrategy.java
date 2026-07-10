import java.util.Map;

// Strategy: pricing pluggable without touching the service.
public interface PricingStrategy {
    double price(ShowSeat seat);
}

class TieredPricing implements PricingStrategy {
    private final Map<SeatType, Double> rates;
    public TieredPricing(Map<SeatType, Double> rates) { this.rates = rates; }
    public double price(ShowSeat seat) { return rates.get(seat.type); }
}