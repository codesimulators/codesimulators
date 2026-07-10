class RemoteControl {
    private Light light = new Light();
    private Fan fan = new Fan();

    // ❌ Hardwired buttons violate open-closed principles
    public void pressButton1() {
        light.turnOn();
    }
    public void pressButton2() {
        fan.setSpeed(3);
    }
}