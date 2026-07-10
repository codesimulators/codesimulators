// Common presets, written once, on top of the same builder:
class Requests {
  static json(url: string, payload: object): HttpRequest {
    return new RequestBuilder()
      .method("POST")
      .url(url)
      .header("Content-Type", "application/json")
      .body(JSON.stringify(payload))
      .build();              // still validated here
  }
}

// Callers get a tested recipe — no repeated chains:
const req = Requests.json("/api/orders", { id: 7 });