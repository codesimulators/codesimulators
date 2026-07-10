type Tv struct {
    on     bool
    volume int
}
func (t *Tv) IsEnabled() bool { return t.on }
func (t *Tv) Enable()         { t.on = true }
func (t *Tv) Disable()        { t.on = false }
func (t *Tv) GetVolume() int  { return t.volume }
func (t *Tv) SetVolume(p int) { t.volume = p }