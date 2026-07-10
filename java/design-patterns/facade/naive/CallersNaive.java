// The living-room "Movie Night" button:
void movieNightButton() {
    Amplifier amp = new Amplifier();
    Lights lights = new Lights();
    Projector projector = new Projector();
    StreamingBox box = new StreamingBox();

    lights.dim(10);                 // ❌ caller must know all six APIs
    projector.on();
    projector.wide();
    amp.on();
    amp.setVolume(7);
    box.play("Dune");               // …and the exact ORDER
}
// The mobile app and voice assistant repeat the same dance.