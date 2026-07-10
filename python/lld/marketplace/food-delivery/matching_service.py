from courier import CourierAvailability


class NoCouriersAvailable(Exception):
    pass


class MatchingService:
    """The exact same candidate-cascade shape as Cab Booking's
    MatchingService — reused wholesale, just matching couriers to a
    restaurant instead of drivers to a rider. Candidates arrive pre-sorted
    nearest-first."""

    def find_and_claim(self, order, candidates, respond) -> str:
        for courier in candidates:
            if courier.status != CourierAvailability.AVAILABLE:
                continue  # lost the race to another order
            courier.status = CourierAvailability.EN_ROUTE_TO_PICKUP  # atomic claim (compare-and-set)

            accepted = respond(courier.id)  # simulates the timeout-bounded ping
            if accepted:
                order.assign_courier(courier.id)
                return courier.id
            courier.status = CourierAvailability.AVAILABLE  # release — try the next candidate
        raise NoCouriersAvailable()