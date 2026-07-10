public interface AirTrafficControl {
    void registerAircraft(Aircraft aircraft);
    boolean requestLanding(Aircraft aircraft);
}