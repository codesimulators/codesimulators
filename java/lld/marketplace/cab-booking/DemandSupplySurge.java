public class DemandSupplySurge implements SurgeStrategy {
    @Override
    public double multiplier(int openRequests, int availableDrivers) {
        if (availableDrivers == 0) return 3.0;               // cap even with zero supply
        double ratio = (double) openRequests / availableDrivers;
        return Math.min(3.0, Math.max(1.0, ratio));           // 1.0x floor, 3.0x cap
    }
}