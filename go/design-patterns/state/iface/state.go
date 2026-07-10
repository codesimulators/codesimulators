type PlayerState interface {
    Play(p *Player)
    Pause(p *Player)
    Stop(p *Player)
    Name() string
}