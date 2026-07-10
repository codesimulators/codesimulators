class Aircraft {
protected:
    AirTrafficControl* atc;
    std::string id;
public:
    Aircraft(AirTrafficControl* mediator, std::string name) : atc(mediator), id(name) {
        atc->registerAircraft(this);
    }
    virtual void notify(std::string msg) = 0;
};