class Player {
  state: PlayerState = new Stopped();
  setState(s: PlayerState) { this.state = s; }

  // The player delegates — it has NO if/else on its mode.
  play()  { this.state.play(this); }
  pause() { this.state.pause(this); }
  stop()  { this.state.stop(this); }
}