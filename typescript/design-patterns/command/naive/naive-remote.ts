// Naive approach: remote controls are hardcoded to specific light/fan devices
class RemoteControl {
  private livingRoomLight = new Light();
  private ceilingFan = new Fan();

  // ❌ Adding a new device or changing button layouts means modifying this class
  button1Click() {
    this.livingRoomLight.turnOn();
  }

  button2Click() {
    this.ceilingFan.setSpeed(3);
  }

  // ❌ Supporting Undo is near-impossible without storing manual state histories here
}