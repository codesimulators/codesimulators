from direction import Direction
from elevator import Elevator
from look_scheduler import LookScheduler

lift = Elevator(LookScheduler())

# That's the whole API -- press a button and the car drives itself. No loop
# to write, no tick to call: request_pickup/select_destination wake an
# internal 100ms timer that logs each arrival until the car settles idle.
# (Non-daemon timer threads keep the script alive until it settles.)

lift.request_pickup(5, Direction.DOWN)    # lobby -- someone presses 5▼
# lift.select_destination(0)              # car -- boarded rider picks floor 0