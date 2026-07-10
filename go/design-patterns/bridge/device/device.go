type Device interface {
    IsEnabled() bool
    Enable()
    Disable()
    GetVolume() int
    SetVolume(percent int)
}