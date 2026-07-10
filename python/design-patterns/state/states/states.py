class Stopped(PlayerState):
    name = "Stopped"
    def play(self, p): p.set_state(Playing())

class Playing(PlayerState):
    name = "Playing"
    def pause(self, p): p.set_state(Paused())
    def stop(self, p):  p.set_state(Stopped())