HttpRequest jsonRequest(const std::string& url, const std::string& payload) {
    return RequestBuilder()
        .method("POST")
        .url(url)
        .header("Content-Type", "application/json")
        .body(payload)
        .build();                    // still validated here
}

auto req = jsonRequest("/api/orders", "{\\"id\\":7}");