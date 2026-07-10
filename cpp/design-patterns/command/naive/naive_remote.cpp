class RemoteControl {
    Light light;
    Fan fan;
public:
    // ❌ Hardcoded triggers
    void pressButton1() { light.turnOn(); }
};