const ticker = new StockTicker();
const app = new MobileApp();
const bot = new TradingBot();

ticker.subscribe(app);        // ➕ add a subscriber
ticker.subscribe(bot);        // ➕ add another
ticker.setPrice(151.20);      // → app AND bot get update()

ticker.unsubscribe(app);      // ➖ remove a subscriber
ticker.setPrice(149.90);      // → only bot gets update()