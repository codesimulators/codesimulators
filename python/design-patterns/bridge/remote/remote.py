class RemoteControl:
    def __init__(self, device: Device):
        self.device = device
    def toggle_power(self):
        if self.device.is_enabled():
            self.device.disable()
        else:
            self.device.enable()
    def volume_down(self):
        self.device.set_volume(self.device.get_volume() - 10)
    def volume_up(self):
        self.device.set_volume(self.device.get_volume() + 10)

class AdvancedRemoteControl(RemoteControl):
    def mute(self):
        self.device.set_volume(0)