class BasicTvRemote:
    def turn_on(self): print("TV on")
    def set_volume(self, v): print(f"TV volume to {v}")

class AdvancedTvRemote(BasicTvRemote):
    def mute(self): print("TV muted")

class BasicRadioRemote:
    def turn_on(self): print("Radio on")
    def set_volume(self, v): print(f"Radio volume to {v}")

class AdvancedRadioRemote(BasicRadioRemote):
    def mute(self): print("Radio muted")