func JSONRequest(url string, payload any) (HttpRequest, error) {
    body, _ := json.Marshal(payload)
    return NewRequest().
        Method("POST").
        URL(url).
        Header("Content-Type", "application/json").
        Body(string(body)).
        Build()                      // still validated here
}

req, _ := JSONRequest("/api/orders", Order{ID: 7})