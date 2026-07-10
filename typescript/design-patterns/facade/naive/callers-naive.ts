// The living-room "Movie Night" button:
function movieNightButton() {
  const amp = new Amplifier();
  const lights = new Lights();
  const projector = new Projector();
  const box = new StreamingBox();

  lights.dim(10);                 // ❌ caller must know all six APIs
  projector.on();
  projector.wide();
  amp.on();
  amp.setVolume(7);
  box.play("Dune");               // …and the exact ORDER
}

// The mobile app's "Play" screen repeats the SAME six calls.
// The voice assistant's "watch a movie" repeats them AGAIN.
// Change the order once → fix it in every one of them.