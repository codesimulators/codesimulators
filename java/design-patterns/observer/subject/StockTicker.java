class StockTicker {
    private final List<Observer> observers = new ArrayList<>();

    public void subscribe(Observer o)   { observers.add(o); }
    public void unsubscribe(Observer o) { observers.remove(o); }

    public void setPrice(double p) {
        for (Observer o : observers) o.update(p);
    }
}