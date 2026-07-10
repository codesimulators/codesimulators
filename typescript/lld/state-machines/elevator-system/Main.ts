import { Direction } from './Direction';
import { Elevator } from './Elevator';
import { LookScheduler } from './LookScheduler';

const lift = new Elevator(new LookScheduler());

// That's the whole API — press a button and the car drives itself. No loop
// to write, no tick to call: requestPickup/selectDestination wake an
// internal 100ms timer that logs each arrival until the car settles idle.

lift.requestPickup(5, Direction.DOWN);   // lobby — someone presses 5▼
// lift.selectDestination(0);            // car — boarded rider picks floor 0