class Player:
    def __init__(self): self.state = Stopped()
    def set_state(self, s): self.state = s
    def play(self):  self.state.play(self)
    def pause(self): self.state.pause(self)
    def stop(self):  self.state.stop(self)