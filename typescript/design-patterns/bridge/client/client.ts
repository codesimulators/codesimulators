// Client bridges a concrete Abstraction with a concrete Implementation
const tv = new Tv();
const remote = new AdvancedRemoteControl(tv);

remote.togglePower(); // TV turns on
remote.mute();        // TV volume set to 0