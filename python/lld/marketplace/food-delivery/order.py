from delivery_status import DeliveryStatus
from preparation_status import PreparationStatus


class Order:
    """The aggregate. Two INDEPENDENT sub-statuses live on one order; only
    pick_up() ever reads both together, and only to guard the one
    transition that truly depends on both."""

    def __init__(self, id: str, customer_id: str, restaurant_id: str, restaurant_lat: float, restaurant_lng: float):
        self.id = id
        self.customer_id = customer_id
        self.restaurant_id = restaurant_id
        self.restaurant_lat = restaurant_lat
        self.restaurant_lng = restaurant_lng
        self.prep_status = PreparationStatus.RECEIVED
        self.delivery_status = DeliveryStatus.UNASSIGNED
        self.courier_id = None

    def start_preparing(self) -> None:
        self.prep_status = PreparationStatus.PREPARING
        self.delivery_status = DeliveryStatus.SEARCHING

    def mark_ready(self) -> None:
        self.prep_status = PreparationStatus.READY

    def assign_courier(self, courier_id: str) -> None:
        self.courier_id = courier_id
        self.delivery_status = DeliveryStatus.COURIER_ASSIGNED

    def courier_arrived(self) -> None:
        self.delivery_status = DeliveryStatus.ARRIVED

    def pick_up(self) -> None:
        if self.prep_status != PreparationStatus.READY:
            raise ValueError("food not ready yet")
        if self.delivery_status != DeliveryStatus.ARRIVED:
            raise ValueError("courier not here yet")
        self.delivery_status = DeliveryStatus.PICKED_UP

    def deliver(self) -> None:
        self.delivery_status = DeliveryStatus.DELIVERED

    def cancel(self) -> None:
        if self.delivery_status in (DeliveryStatus.PICKED_UP, DeliveryStatus.DELIVERED):
            raise ValueError("too late to cancel")
        self.prep_status = PreparationStatus.CANCELLED
        self.delivery_status = DeliveryStatus.CANCELLED

    def tracking_status(self) -> str:
        return f"{self.prep_status.value} / {self.delivery_status.value}"