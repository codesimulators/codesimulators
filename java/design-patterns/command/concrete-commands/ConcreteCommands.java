class LightOnCommand implements Command {
    private Light light;
    public LightOnCommand(Light light) { this.light = light; }
    public void execute() { light.turnOn(); }
    public void undo() { light.turnOff(); }
}
class LightDimCommand implements Command {
    private Light light;
    private int level;
    private int prevLevel = 100;
    public LightDimCommand(Light light, int level) {
        this.light = light;
        this.level = level;
    }
    public void execute() {
        prevLevel = light.getDimLevel();
        light.setDimLevel(level);
    }
    public void undo() {
        light.setDimLevel(prevLevel);
    }
}