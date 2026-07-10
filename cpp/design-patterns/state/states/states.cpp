class Stopped : public PlayerState {
public:
    void play(Player& p) override;  // -> Playing
    void pause(Player&) override {}  // ignored
    void stop(Player&) override {}   // already stopped
};