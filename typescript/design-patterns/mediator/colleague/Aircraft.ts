// Colleague class: interacts ONLY with the mediator, ignoring other peers
abstract class Aircraft {
  constructor(protected atc: AirTrafficControl, public id: string) {
    this.atc.registerAircraft(this);
  }

  requestLanding(): void {
    // 🎯 Decoupled request: ask the central mediator
    const approved = this.atc.requestLanding(this);
    if (approved) {
      console.log(\