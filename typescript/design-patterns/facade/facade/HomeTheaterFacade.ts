// One simple method that orchestrates the mess.
class HomeTheaterFacade {
  constructor(
    private amp = new Amplifier(),
    private lights = new Lights(),
    private projector = new Projector(),
    private box = new StreamingBox(),
  ) {}

  watchMovie(title: string) {
    this.lights.dim(10);
    this.projector.on();
    this.projector.wide();
    this.amp.on();
    this.amp.setVolume(7);
    this.box.play(title);          // 6 calls → one for the caller
  }
}