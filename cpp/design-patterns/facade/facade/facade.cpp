class HomeTheaterFacade {
    Amplifier amp; Lights lights;
    Projector projector; StreamingBox box;
public:
    void watchMovie(const std::string& title) {
        lights.dim(10);
        projector.on();
        projector.wide();
        amp.on();
        amp.setVolume(7);
        box.play(title);
    }
};