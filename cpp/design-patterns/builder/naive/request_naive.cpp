class HttpRequest {
public:
    HttpRequest(std::string method, std::string url,
                std::map<std::string,std::string> headers = {},
                std::string body = "", int timeoutMs = 0,
                int retries = 0, bool followRedirects = false);
};

// At the call site, nobody can read this:
HttpRequest("POST", "/api/orders", headers, "{}", 0, 3, true);