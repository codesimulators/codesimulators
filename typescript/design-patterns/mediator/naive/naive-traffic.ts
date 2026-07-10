// Naive approach: planes reference each other directly, creating a complex web of coupling
class CommercialAircraft {
  constructor(public id: string, private otherPlanes: CommercialAircraft[]) {}

  requestLanding() {
    // ❌ Plane checks status of every other plane directly (O(N^2) connections)
    for (const plane of this.otherPlanes) {
      if (plane.isLanding()) {
        console.log("Runway occupied by " + plane.id + ". Landing aborted.");
        return;
      }
    }
    console.log("Runway clear. Landing aircraft " + this.id);
  }
  
  isLanding() { return true; }
}