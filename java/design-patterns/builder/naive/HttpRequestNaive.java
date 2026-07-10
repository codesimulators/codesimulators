class HttpRequest {
    HttpRequest(String method, String url, Map<String,String> headers,
                String body, Integer timeoutMs, Integer retries,
                Boolean followRedirects) { /* …assign all seven… */ }
}

// At the call site, nobody can read this:
new HttpRequest("POST", "/api/orders", headers, "{\\"id\\":7}", null, 3, true);

// Each new optional combo tempts ANOTHER overload constructor.