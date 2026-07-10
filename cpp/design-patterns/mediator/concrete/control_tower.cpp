class ControlTower : public AirTrafficControl {
    std::vector<Aircraft*> list;
    bool occupied = false;
public:
    void registerAircraft(Aircraft* a) override { list.push_back(a); }
    bool requestLanding(Aircraft* a) override {
        if (occupied) return false;
        occupied = true;
        return true;
    }
};