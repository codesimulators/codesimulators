class StockTicker {
    private MobileApp app = new MobileApp();
    private WebDashboard chart = new WebDashboard();
    private EmailAlerter mailer = new EmailAlerter();

    void setPrice(double p) {
        // ❌ adding a listener means editing this class
        app.refresh(p);
        chart.redraw(p);
        mailer.maybeAlert(p);
    }
}