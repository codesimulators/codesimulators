class HomeTheaterFacade {
public:
    void watchMovie(const std::string& title) { /* …unchanged… */ }

    void endMovie() {            // a brand-new high-level task
        box.stop();
        projector.off();
        amp.off();
        lights.dim(100);
    }
};

// Callers gain a whole feature without learning any subsystem:
theater.endMovie();