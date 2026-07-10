class BasicTvRemote {
    void turnOn() { System.out.println("TV on"); }
    void setVolume(int v) { System.out.println("TV volume: " + v); }
}
class AdvancedTvRemote extends BasicTvRemote {
    void mute() { System.out.println("TV muted"); }
}
class BasicRadioRemote {
    void turnOn() { System.out.println("Radio on"); }
    void setVolume(int v) { System.out.println("Radio volume: " + v); }
}
class AdvancedRadioRemote extends BasicRadioRemote {
    void mute() { System.out.println("Radio muted"); }
}