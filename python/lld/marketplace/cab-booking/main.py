from demand_supply_surge import DemandSupplySurge
from driver import Driver
from ride_dispatcher import RideDispatcher

dispatcher = RideDispatcher(DemandSupplySurge())
dispatcher.register_driver(Driver("d1", 12.971, 77.594))   # 0.4km from pickup
dispatcher.register_driver(Driver("d2", 12.975, 77.598))   # 0.9km from pickup

# d1 never answers (simulated no-show); d2 accepts.
ride = dispatcher.request_ride("rider-9", 12.9716, 77.5946, lambda driver_id: driver_id != "d1")

print(ride.status, ride.driver_id, ride.fare_multiplier)
# RideStatus.DRIVER_ASSIGNED d2 1.0