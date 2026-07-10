type RemoteControl struct {
    light *Light
    fan   *Fan
}
// ❌ Rigid method receivers
func (r *RemoteControl) PressButton1() { r.light.TurnOn() }