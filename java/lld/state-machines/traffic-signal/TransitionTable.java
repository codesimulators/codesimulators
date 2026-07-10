import java.util.Map;

// The transition TABLE is the machine's brain: for each colour, what comes
// next and how long it must hold. Timing/order is data, not branching code.
public final class TransitionTable {
    public record Phase(SignalColor next, int holdSec) {}

    public static final Map<SignalColor, Phase> TRANSITIONS = Map.of(
        SignalColor.RED,    new Phase(SignalColor.GREEN,  30),
        SignalColor.GREEN,  new Phase(SignalColor.YELLOW, 25),
        SignalColor.YELLOW, new Phase(SignalColor.RED,    5)
    );
}