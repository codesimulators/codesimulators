type AirTrafficControl interface {
    RegisterAircraft(a *Aircraft)
    RequestLanding(a *Aircraft) bool
}