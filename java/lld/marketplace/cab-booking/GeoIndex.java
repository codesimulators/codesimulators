import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

// A coarse geohash-lite: bucket drivers into 0.01-degree grid cells so a
// lookup only scans the rider's cell + its 8 neighbours, never the whole
// driver table.
public class GeoIndex {
    private static final double CELL_SIZE = 0.01;
    private final Map<String, Set<String>> cells = new HashMap<>();
    private final Map<String, String> driverCell = new HashMap<>();

    private String keyFor(double lat, double lng) {
        return (long) Math.floor(lat / CELL_SIZE) + ":" + (long) Math.floor(lng / CELL_SIZE);
    }

    public void upsert(Driver driver) {
        String key = keyFor(driver.lat, driver.lng);
        String prev = driverCell.get(driver.id);
        if (key.equals(prev)) return;
        if (prev != null) {
            Set<String> old = cells.get(prev);
            if (old != null) old.remove(driver.id);
        }
        cells.computeIfAbsent(key, k -> new HashSet<>()).add(driver.id);
        driverCell.put(driver.id, key);
    }

    public Set<String> nearbyDriverIds(double lat, double lng) {
        String[] parts = keyFor(lat, lng).split(":");
        long cx = Long.parseLong(parts[0]), cy = Long.parseLong(parts[1]);
        Set<String> ids = new HashSet<>();
        for (long dx = -1; dx <= 1; dx++) {
            for (long dy = -1; dy <= 1; dy++) {
                Set<String> cell = cells.get((cx + dx) + ":" + (cy + dy));
                if (cell != null) ids.addAll(cell);
            }
        }
        return ids;
    }
}