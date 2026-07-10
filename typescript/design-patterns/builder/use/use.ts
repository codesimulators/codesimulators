const req = new RequestBuilder()
  .method("POST")
  .url("/api/orders")
  .header("Content-Type", "application/json")
  .body(JSON.stringify({ id: 7 }))
  .build();   // reads like a sentence