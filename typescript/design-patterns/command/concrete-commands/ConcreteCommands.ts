// LightOnCommand implements Command and wraps Light actions
class LightOnCommand implements Command {
  constructor(private light: Light) {}

  execute() {
    this.light.turnOn();
  }

  undo() {
    this.light.turnOff();
  }
}

// LightDimCommand stores previous volume/dim state for undo
class LightDimCommand implements Command {
  private prevLevel = 100;

  constructor(private light: Light, private targetLevel: number) {}

  execute() {
    this.prevLevel = this.light.getDimLevel();
    this.light.setDimLevel(this.targetLevel);
  }

  undo() {
    this.light.setDimLevel(this.prevLevel);
  }
}