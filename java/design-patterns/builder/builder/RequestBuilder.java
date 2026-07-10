public class RequestBuilder {
    private String method = "GET", url, body;
    private final Map<String,String> headers = new HashMap<>();

    public RequestBuilder method(String m) { this.method = m; return this; }
    public RequestBuilder url(String u)    { this.url = u;    return this; }
    public RequestBuilder header(String k, String v) {
        headers.put(k, v); return this;
    }
    public RequestBuilder body(String b)   { this.body = b;   return this; }

    public HttpRequest build() {
        if (url == null) throw new IllegalStateException("url required");
        return new HttpRequest(method, url, headers, body);
    }
}