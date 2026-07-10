class MobileApp implements Observer {
    public void update(double price) {
        System.out.println("push: " + price);
    }
}
class WebDashboard implements Observer {
    public void update(double price) {
        System.out.println("chart: " + price);
    }
}