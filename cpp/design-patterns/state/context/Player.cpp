class Player {
    std::unique_ptr<PlayerState> state;
public:
    void setState(std::unique_ptr<PlayerState> s) { state = std::move(s); }
    void play()  { state->play(*this); }
    void pause() { state->pause(*this); }
};