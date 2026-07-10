ticker = StockTicker()
app = MobileApp()
bot = TradingBot()

ticker.subscribe(app)         # ➕ add a subscriber
ticker.subscribe(bot)         # ➕ add another
ticker.set_price(151.20)      # → app AND bot get update()

ticker.unsubscribe(app)       # ➖ remove a subscriber
ticker.set_price(149.90)      # → only bot gets update()