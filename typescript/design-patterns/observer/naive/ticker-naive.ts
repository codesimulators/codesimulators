// The price source imports and calls every UI directly.
class StockTicker {
  private app = new MobileApp();
  private chart = new WebDashboard();
  private mailer = new EmailAlerter();

  setPrice(p: number) {
    // ❌ adding a TradingBot means editing this method
    this.app.refresh(p);
    this.chart.redraw(p);
    this.mailer.maybeAlert(p);
  }
}