// Naive approach: creating classes for every combination
class BasicTvRemote {
  turnOn() { console.log("TV on"); }
  setVolume(v: number) { console.log("TV volume to " + v); }
}

class AdvancedTvRemote extends BasicTvRemote {
  mute() { console.log("TV muted"); }
}

class BasicRadioRemote {
  turnOn() { console.log("Radio on"); }
  setVolume(v: number) { console.log("Radio volume to " + v); }
}

class AdvancedRadioRemote extends BasicRadioRemote {
  mute() { console.log("Radio muted"); }
}
// Adding a Projector -> creates 2 new classes.
// Adding a TouchPadRemote -> creates N new classes. Class explosion!