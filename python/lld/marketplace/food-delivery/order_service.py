import math
from courier import CourierAvailability
from matching_service import MatchingService
from order import Order


class OrderService:
    """Facade — coordinates both sub-machines and the matching service.
    Kicks off courier search on PREPARING, not READY — the whole point of
    the design."""

    def __init__(self):
        self._orders = {}
        self._couriers = {}
        self._matching = MatchingService()
        self._next_order_id = 1

    def register_courier(self, courier) -> None:
        courier.status = CourierAvailability.AVAILABLE
        self._couriers[courier.id] = courier

    def place_order(self, customer_id: str, restaurant_id: str, restaurant_lat: float, restaurant_lng: float) -> Order:
        order = Order(f"o{self._next_order_id}", customer_id, restaurant_id, restaurant_lat, restaurant_lng)
        self._next_order_id += 1
        self._orders[order.id] = order
        return order

    def on_kitchen_starts_preparing(self, order, respond) -> None:
        """Called the moment the kitchen starts cooking — NOT when the
        food is ready. This is what makes the two timelines overlap."""
        order.start_preparing()
        candidates = [c for c in self._couriers.values() if c.status == CourierAvailability.AVAILABLE]
        candidates.sort(key=lambda c: self._distance(c, order))
        self._matching.find_and_claim(order, candidates, respond)

    def on_kitchen_ready(self, order) -> None:
        order.mark_ready()

    def on_courier_arrived(self, order) -> None:
        order.courier_arrived()

    def complete_pickup(self, order) -> None:
        order.pick_up()

    def tracking_status(self, order) -> str:
        return order.tracking_status()

    def _distance(self, courier, order) -> float:
        return math.hypot(courier.lat - order.restaurant_lat, courier.lng - order.restaurant_lng)