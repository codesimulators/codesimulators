import java.util.Map;

// Strategy: nightly rate is pluggable.
public interface PricingStrategy {
    double perNight(Room room);
}

class SeasonalPricing implements PricingStrategy {
    private final Map<RoomType, Double> rates;
    public SeasonalPricing(Map<RoomType, Double> rates) { this.rates = rates; }
    public double perNight(Room room) { return rates.get(room.type); }
}