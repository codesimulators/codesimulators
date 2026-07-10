class Tv implements Device {
  private on = false;
  private volume = 30;

  isEnabled() { return this.on; }
  enable() { this.on = true; }
  disable() { this.on = false; }
  getVolume() { return this.volume; }
  setVolume(p: number) { this.volume = Math.max(0, Math.min(100, p)); }
}

class Radio implements Device {
  private on = false;
  private volume = 15;

  isEnabled() { return this.on; }
  enable() { this.on = true; }
  disable() { this.on = false; }
  getVolume() { return this.volume; }
  setVolume(p: number) { this.volume = Math.max(0, Math.min(100, p)); }
}