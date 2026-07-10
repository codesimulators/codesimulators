ticker := &StockTicker{}
app := &MobileApp{}
bot := &TradingBot{}

ticker.Subscribe(app)         // ➕ add a subscriber
ticker.Subscribe(bot)         // ➕ add another
ticker.SetPrice(151.20)       // → app AND bot get Update()

ticker.Unsubscribe(app)       // ➖ remove a subscriber
ticker.SetPrice(149.90)       // → only bot gets Update()