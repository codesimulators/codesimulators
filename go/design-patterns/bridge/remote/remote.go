type RemoteControl struct {
    device Device
}
func (r *RemoteControl) TogglePower() {
    if r.device.IsEnabled() {
        r.device.Disable()
    } else {
        r.device.Enable()
    }
}
type AdvancedRemote struct {
    RemoteControl
}
func (r *AdvancedRemote) Mute() {
    r.device.SetVolume(0)
}