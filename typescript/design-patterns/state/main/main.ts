const player = new Player();   // starts in Stopped

player.play();    // Stopped → Playing
player.pause();   // Playing → Paused
player.play();    // Paused  → Playing  (resume)
player.stop();    // Playing → Stopped

player.pause();   // Stopped: ignored — no crash, no guard at the call site