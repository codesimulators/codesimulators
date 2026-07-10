public abstract class Aircraft {
    protected AirTrafficControl atc;
    protected String id;
    public Aircraft(AirTrafficControl atc, String id) {
        this.atc = atc;
        this.id = id;
        this.atc.registerAircraft(this);
    }
    public abstract void notify(String msg);
}