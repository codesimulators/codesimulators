type Stopped struct{}
func (Stopped) Name() string    { return "Stopped" }
func (Stopped) Play(p *Player)  { p.SetState(Playing{}) }
func (Stopped) Pause(p *Player) {}
func (Stopped) Stop(p *Player)  {}