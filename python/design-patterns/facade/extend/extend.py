class HomeTheaterFacade:
    def watch_movie(self, title): ...   # same one call for callers

    def end_movie(self):                # a brand-new high-level task
        self.box.stop()
        self.projector.off()
        self.amp.off()
        self.lights.dim(100)

# Callers gain a whole feature without learning any subsystem:
theater.end_movie()