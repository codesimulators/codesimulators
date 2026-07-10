class BasicTvRemote {
public:
    void turnOn() { std::cout << "TV on\\n"; }
    void setVolume(int v) { std::cout << "TV volume: " << v << "\\n"; }
};
class AdvancedTvRemote : public BasicTvRemote {
public:
    void mute() { std::cout << "TV muted\\n"; }
};