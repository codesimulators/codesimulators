req, err := NewRequest().
    Method("POST").
    URL("/api/orders").
    Header("Content-Type", "application/json").
    Build()