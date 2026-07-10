class Aircraft; // Forward declaration
class AirTrafficControl {
public:
    virtual ~AirTrafficControl() = default;
    virtual void registerAircraft(Aircraft* a) = 0;
    virtual bool requestLanding(Aircraft* a) = 0;
};