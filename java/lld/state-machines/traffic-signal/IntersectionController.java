// Two lights, one invariant: NS and EW are never flowing at once.
public class IntersectionController {
    private final TrafficLight ns = new TrafficLight(SignalColor.GREEN);
    private final TrafficLight ew = new TrafficLight(SignalColor.RED);

    private boolean go(SignalColor c) { return c != SignalColor.RED; }

    private boolean safe() {
        return !(go(ns.getColor()) && go(ew.getColor()));
    }

    public void tick(int dt) {
        boolean nsGo = go(ns.getColor());
        TrafficLight live = nsGo ? ns : ew;
        TrafficLight idle = nsGo ? ew : ns;

        SignalColor changed = live.tick(dt);
        if (changed == SignalColor.RED) idle.forceTo(SignalColor.GREEN);
        if (!safe()) throw new IllegalStateException("INVARIANT VIOLATED");
    }

    public String state() { return "NS=" + ns.getColor() + "  EW=" + ew.getColor(); }
}