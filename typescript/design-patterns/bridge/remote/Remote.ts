// Abstraction: holds a reference to a Device implementation
class RemoteControl {
  protected device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  togglePower() {
    if (this.device.isEnabled()) {
      this.device.disable();
    } else {
      this.device.enable();
    }
  }

  volumeDown() {
    this.device.setVolume(this.device.getVolume() - 10);
  }

  volumeUp() {
    this.device.setVolume(this.device.getVolume() + 10);
  }
}

// Refined Abstraction adds features without modifying Device classes
class AdvancedRemoteControl extends RemoteControl {
  mute() {
    this.device.setVolume(0);
  }
}