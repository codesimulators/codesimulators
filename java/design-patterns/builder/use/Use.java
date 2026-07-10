HttpRequest req = new RequestBuilder()
    .method("POST")
    .url("/api/orders")
    .header("Content-Type", "application/json")
    .build();