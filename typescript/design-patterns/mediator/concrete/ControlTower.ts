// Concrete Mediator: owns coordinates, locks, and schedules runway operations
class ControlTower implements AirTrafficControl {
  private aircrafts: Aircraft[] = [];
  private runwayOccupied = false;

  registerAircraft(a: Aircraft) {
    this.aircrafts.push(a);
  }

  requestLanding(a: Aircraft): boolean {
    if (this.runwayOccupied) {
      // Notify other colleagues of delays
      a.notify("Runway busy. Holding pattern.");
      return false;
    }
    this.runwayOccupied = true;
    return true;
  }

  releaseRunway() {
    this.runwayOccupied = false;
    // Broadcast updates to all registered planes
    for (const plane of this.aircrafts) {
      plane.notify("Runway clear for landing requests.");
    }
  }
}