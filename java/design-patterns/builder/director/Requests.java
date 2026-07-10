class Requests {
    static HttpRequest json(String url, Object payload) {
        return new RequestBuilder()
            .method("POST")
            .url(url)
            .header("Content-Type", "application/json")
            .body(toJson(payload))
            .build();                // still validated here
    }
}

HttpRequest req = Requests.json("/api/orders", new Order(7));