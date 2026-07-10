player := &Player{state: Stopped{}}   // starts in Stopped

player.Play()     // Stopped → Playing
player.Pause()    // Playing → Paused
player.Play()     // Paused  → Playing  (resume)
player.Stop()     // Playing → Stopped

player.Pause()    // Stopped: ignored — no crash, no guard at the call site