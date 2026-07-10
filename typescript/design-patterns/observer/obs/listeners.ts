class MobileApp implements Observer {
  update(price: number) { console.log("push: $" + price); }
}
class WebDashboard implements Observer {
  update(price: number) { console.log("chart redrawn @ $" + price); }
}