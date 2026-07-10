class Player;
class PlayerState {
public:
    virtual ~PlayerState() = default;
    virtual void play(Player&)  = 0;
    virtual void pause(Player&) = 0;
    virtual void stop(Player&)  = 0;
};