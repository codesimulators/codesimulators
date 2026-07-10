import java.util.ArrayDeque;
import java.util.Deque;

// One client's throttling state. Shape depends on the strategy in use —
// a token bucket needs tokens+lastRefill; a sliding window needs a log.
public class ClientState {
    public double tokens;
    public long lastRefill;
    public final Deque<Long> requestLog = new ArrayDeque<>();
}