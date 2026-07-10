// Go doesn't have class inheritance, but naive code duplicates structs
type BasicTvRemote struct{}
func (r *BasicTvRemote) TurnOn() { fmt.Println("TV on") }

type AdvancedTvRemote struct {
    BasicTvRemote
}
func (r *AdvancedTvRemote) Mute() { fmt.Println("TV muted") }