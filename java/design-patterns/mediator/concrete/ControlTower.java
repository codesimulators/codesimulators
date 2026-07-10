class ControlTower implements AirTrafficControl {
    private List<Aircraft> aircrafts = new ArrayList<>();
    private boolean runwayOccupied = false;

    public void registerAircraft(Aircraft a) { aircrafts.add(a); }
    public boolean requestLanding(Aircraft a) {
        if (runwayOccupied) return false;
        runwayOccupied = true;
        return true;
    }
}