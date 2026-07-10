class RequestBuilder {
    HttpRequest req;
public:
    RequestBuilder() { req.method = "GET"; }
    RequestBuilder& method(std::string m) { req.method = m; return *this; }
    RequestBuilder& url(std::string u)    { req.url = u;    return *this; }
    RequestBuilder& header(std::string k, std::string v) {
        req.headers[k] = v; return *this;
    }
    HttpRequest build() {
        if (req.url.empty()) throw std::logic_error("url required");
        return req;
    }
};