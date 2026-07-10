class RemoteControl {
    protected Device device;
    public RemoteControl(Device device) {
        this.device = device;
    }
    public void togglePower() {
        if (device.isEnabled()) device.disable();
        else device.enable();
    }
    public void volumeDown() {
        device.setVolume(device.getVolume() - 10);
    }
    public void volumeUp() {
        device.setVolume(device.getVolume() + 10);
    }
}
class AdvancedRemoteControl extends RemoteControl {
    public AdvancedRemoteControl(Device device) { super(device); }
    public void mute() { device.setVolume(0); }
}