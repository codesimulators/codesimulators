from courier import Courier
from order_service import OrderService

service = OrderService()
service.register_courier(Courier("c1", 12.972, 77.595))

order = service.place_order("cust-1", "rest-1", 12.9716, 77.5946)

# Courier search starts here — the SAME moment the kitchen starts cooking.
service.on_kitchen_starts_preparing(order, lambda courier_id: True)
print(service.tracking_status(order))   # PREPARING / COURIER_ASSIGNED

service.on_courier_arrived(order)
service.on_kitchen_ready(order)
print(service.tracking_status(order))   # READY / ARRIVED

service.complete_pickup(order)
print(service.tracking_status(order))   # READY / PICKED_UP