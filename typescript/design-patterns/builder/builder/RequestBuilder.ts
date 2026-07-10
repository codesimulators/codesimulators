// Each step returns 'this' so calls chain.
class RequestBuilder {
  private req: HttpRequest = { method: "GET", url: "", headers: {} };

  method(m: string)            { this.req.method = m; return this; }
  url(u: string)               { this.req.url = u; return this; }
  header(k: string, v: string) { this.req.headers[k] = v; return this; }
  body(b: string)              { this.req.body = b; return this; }

  build(): HttpRequest {
    if (!this.req.url) throw new Error("url is required");
    return this.req;           // validate, then hand over
  }
}