// Mediator interface: centralizes communication protocols
interface AirTrafficControl {
  registerAircraft(aircraft: Aircraft): void;
  requestLanding(aircraft: Aircraft): boolean;
}