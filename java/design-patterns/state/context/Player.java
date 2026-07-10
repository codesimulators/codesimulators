class Player {
    private PlayerState state = new Stopped();
    void setState(PlayerState s) { this.state = s; }
    void play()  { state.play(this); }
    void pause() { state.pause(this); }
    void stop()  { state.stop(this); }
}