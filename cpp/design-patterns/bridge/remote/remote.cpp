class RemoteControl {
protected:
    Device* device;
public:
    RemoteControl(Device* dev) : device(dev) {}
    void togglePower() {
        if (device->isEnabled()) device->disable();
        else device->enable();
    }
    void volumeUp() { device->setVolume(device->getVolume() + 10); }
};