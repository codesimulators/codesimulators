class Requests:
    @staticmethod
    def json(url, payload):
        return (RequestBuilder()
                .method("POST")
                .url(url)
                .header("Content-Type", "application/json")
                .body(json.dumps(payload))
                .build())            # still validated here

req = Requests.json("/api/orders", {"id": 7})