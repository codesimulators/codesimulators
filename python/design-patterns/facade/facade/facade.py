class HomeTheaterFacade:
    def __init__(self):
        self.amp = Amplifier()
        self.lights = Lights()
        self.projector = Projector()
        self.box = StreamingBox()

    def watch_movie(self, title):
        self.lights.dim(10)
        self.projector.on(); self.projector.wide()
        self.amp.on(); self.amp.set_volume(7)
        self.box.play(title)