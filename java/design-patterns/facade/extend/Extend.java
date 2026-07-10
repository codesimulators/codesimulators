class HomeTheaterFacade {
    void watchMovie(String title) { /* …same one call for callers… */ }

    void endMovie() {            // a brand-new high-level task
        box.stop();
        projector.off();
        amp.off();
        lights.dim(100);
    }
}

// Callers gain a whole feature without learning any subsystem:
theater.endMovie();