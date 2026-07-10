func (h *HomeTheaterFacade) WatchMovie(title string) { /* …unchanged… */ }

func (h *HomeTheaterFacade) EndMovie() { // a brand-new high-level task
    h.box.Stop()
    h.projector.Off()
    h.amp.Off()
    h.lights.Dim(100)
}

// Callers gain a whole feature without learning any subsystem:
theater.EndMovie()