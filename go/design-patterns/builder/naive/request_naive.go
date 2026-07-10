func NewHttpRequest(method, url string, headers map[string]string,
    body string, timeoutMs, retries int, followRedirects bool) HttpRequest {
    // …assign all seven…
}

// At the call site, nobody can read this:
NewHttpRequest("POST", "/api/orders", headers, "{}", 0, 3, true)
//                                               ^^  ^^ ^  ^^^^  what is 0? 3?