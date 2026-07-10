class Stopped implements PlayerState {
  name = "Stopped";
  play(p: Player)  { p.setState(new Playing()); }   // start
  pause(_: Player) {}                                // ignored
  stop(_: Player)  {}                                // already stopped
}

class Playing implements PlayerState {
  name = "Playing";
  play(_: Player)  {}                                // already playing
  pause(p: Player) { p.setState(new Paused()); }
  stop(p: Player)  { p.setState(new Stopped()); }
}

class Paused implements PlayerState {
  name = "Paused";
  play(p: Player)  { p.setState(new Playing()); }    // resume
  pause(_: Player) {}                                // already paused
  stop(p: Player)  { p.setState(new Stopped()); }
}