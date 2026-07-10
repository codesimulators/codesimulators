class StockTicker:
    def __init__(self):
        self.app = MobileApp()
        self.chart = WebDashboard()
        self.mailer = EmailAlerter()

    def set_price(self, p):
        # ❌ every new listener edits this method
        self.app.refresh(p)
        self.chart.redraw(p)
        self.mailer.maybe_alert(p)