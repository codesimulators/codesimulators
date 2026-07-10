// One light = current colour + how long it has held. tick(dt) advances the
// clock; the GUARD (elapsed >= holdSec) blocks any early transition.
public class TrafficLight {
    private SignalColor color;
    private int elapsed = 0;

    public TrafficLight(SignalColor start) { this.color = start; }

    public SignalColor getColor() { return color; }

    // Advance by dt seconds. Returns the NEW colour if it transitioned, else null.
    public SignalColor tick(int dt) {
        elapsed += dt;
        var phase = TransitionTable.TRANSITIONS.get(color);
        if (elapsed < phase.holdSec()) return null;   // guard: hold time not met
        color = phase.next();                          // table-driven transition
        elapsed = 0;
        return color;
    }

    public void forceTo(SignalColor c) { this.color = c; this.elapsed = 0; }
}