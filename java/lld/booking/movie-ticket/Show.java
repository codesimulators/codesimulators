import java.util.Map;

public class Show {
    public final String id, movieTitle, screen;
    public final long startTime;
    public final Map<String, ShowSeat> seats;   // seatId -> ShowSeat

    public Show(String id, String movieTitle, String screen, long startTime,
                Map<String, ShowSeat> seats) {
        this.id = id; this.movieTitle = movieTitle; this.screen = screen;
        this.startTime = startTime; this.seats = seats;
    }
}