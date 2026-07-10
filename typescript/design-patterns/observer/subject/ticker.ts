// Subject: owns the data and a list of observers.
class StockTicker {
  private observers: Observer[] = [];

  subscribe(o: Observer)   { this.observers.push(o); }
  unsubscribe(o: Observer) { this.observers = this.observers.filter(x => x !== o); }

  setPrice(p: number) {
    // The subject doesn't know WHO listens — it just broadcasts.
    for (const o of this.observers) o.update(p);
  }
}