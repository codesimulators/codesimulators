class HomeTheaterFacade {
    private final Amplifier amp = new Amplifier();
    private final Lights lights = new Lights();
    private final Projector projector = new Projector();
    private final StreamingBox box = new StreamingBox();

    public void watchMovie(String title) {
        lights.dim(10);
        projector.on();
        projector.wide();
        amp.on();
        amp.setVolume(7);
        box.play(title);
    }
}