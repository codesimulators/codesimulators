class Tv : public Device {
    bool on = false;
    int volume = 30;
public:
    bool isEnabled() override { return on; }
    void enable() override { on = true; }
    void disable() override { on = false; }
    int getVolume() override { return volume; }
    void setVolume(int p) override { volume = p; }
};