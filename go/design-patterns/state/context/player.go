type Player struct{ state PlayerState }
func (p *Player) SetState(s PlayerState) { p.state = s }
func (p *Player) Play()  { p.state.Play(p) }
func (p *Player) Pause() { p.state.Pause(p) }
func (p *Player) Stop()  { p.state.Stop(p) }