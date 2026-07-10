type StockTicker struct {
    observers []Observer
}

func (t *StockTicker) Subscribe(o Observer) {
    t.observers = append(t.observers, o)
}

func (t *StockTicker) Unsubscribe(target Observer) {
    kept := t.observers[:0]
    for _, o := range t.observers {
        if o != target {
            kept = append(kept, o)
        }
    }
    t.observers = kept
}

func (t *StockTicker) SetPrice(p float64) {
    // The subject doesn't know WHO listens — it just broadcasts.
    for _, o := range t.observers {
        o.Update(p)
    }
}