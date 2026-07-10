from typing import Dict
from show_seat import ShowSeat


class Show:
    def __init__(self, show_id: str, movie_title: str, screen: str,
                 start_time: float, seats: Dict[str, ShowSeat]):
        self.id = show_id
        self.movie_title = movie_title
        self.screen = screen
        self.start_time = start_time
        self.seats = seats            # seat_id -> ShowSeat