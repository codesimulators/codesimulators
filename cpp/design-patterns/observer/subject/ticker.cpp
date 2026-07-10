class StockTicker {
    std::vector<Observer*> observers;
public:
    void subscribe(Observer* o) { observers.push_back(o); }
    void unsubscribe(Observer* o) {
        observers.erase(std::remove(observers.begin(), observers.end(), o), observers.end());
    }
    void setPrice(double p) {
        // The subject doesn't know WHO listens — it just broadcasts.
        for (auto* o : observers) o->update(p);
    }
};