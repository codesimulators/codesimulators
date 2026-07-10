type Player struct {
    isPlaying bool
    isPaused  bool
}

func (p *Player) Play() {
    if p.isPlaying { return }                    // already playing
    p.isPaused = false
    p.isPlaying = true                           // stopped/paused -> play
}
func (p *Player) Pause() {
    if !p.isPlaying { return }                   // ❌ can't pause if not playing
    p.isPlaying = false
    p.isPaused = true
}
func (p *Player) Stop() {
    // ❌ every method re-checks the same flags
    p.isPlaying = false
    p.isPaused = false
}