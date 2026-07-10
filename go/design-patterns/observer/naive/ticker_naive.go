type StockTicker struct {
    app    *MobileApp
    chart  *WebDashboard
    mailer *EmailAlerter
}

func (t *StockTicker) SetPrice(p float64) {
    // ❌ a new listener means editing this method
    t.app.Refresh(p)
    t.chart.Redraw(p)
    t.mailer.MaybeAlert(p)
}