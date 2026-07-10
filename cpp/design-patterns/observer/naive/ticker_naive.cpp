class StockTicker {
    MobileApp app;
    WebDashboard chart;
    EmailAlerter mailer;
public:
    void setPrice(double p) {
        // ❌ every new listener edits this method
        app.refresh(p);
        chart.redraw(p);
        mailer.maybeAlert(p);
    }
};