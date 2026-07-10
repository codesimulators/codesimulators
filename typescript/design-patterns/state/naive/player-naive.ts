class Player {
  private isPlaying = false;
  private isPaused  = false;

  play() {
    if (this.isPlaying) return;                 // already playing
    if (this.isPaused)  { this.isPaused = false; }
    this.isPlaying = true;                       // stopped/paused → play
  }
  pause() {
    if (!this.isPlaying) return;                 // ❌ can't pause if not playing
    this.isPlaying = false; this.isPaused = true;
  }
  stop() {
    // ❌ every method re-derives "what mode am I in?" from the same flags
    this.isPlaying = false; this.isPaused = false;
  }
}