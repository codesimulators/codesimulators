type HomeTheaterFacade struct {
    amp       Amplifier
    lights    Lights
    projector Projector
    box       StreamingBox
}

func (h *HomeTheaterFacade) WatchMovie(title string) {
    h.lights.Dim(10)
    h.projector.On()
    h.projector.Wide()
    h.amp.On()
    h.amp.SetVolume(7)
    h.box.Play(title)
}