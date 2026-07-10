class HttpRequest {
  constructor(
    method: string,
    url: string,
    headers?: Record<string, string>,
    body?: string,
    timeoutMs?: number,
    retries?: number,
    followRedirects?: boolean,
  ) { /* …assign all seven… */ }
}

// At the call site, nobody can read this:
new HttpRequest("POST", "/api/orders", { "Content-Type": "application/json" },
                '{"id":7}', undefined, 3, true);
//                          ^^^^^^^^^  ^  ^^^^  what is undefined? 3? true?

// Just want a GET with a timeout? Still pass undefined for everything between:
new HttpRequest("GET", "/health", undefined, undefined, 5000);