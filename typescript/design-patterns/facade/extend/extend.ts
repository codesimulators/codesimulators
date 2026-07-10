class HomeTheaterFacade {
  watchMovie(title: string) { /* …same one call for callers… */ }

  endMovie() {                 // a brand-new high-level task
    this.box.stop();
    this.projector.off();
    this.amp.off();
    this.lights.dim(100);
  }
}

// Callers gain a whole feature without learning any subsystem:
theater.endMovie();
// Swap StreamingBox for a new vendor, or re-order the steps —
// every caller's code stays exactly as it was.