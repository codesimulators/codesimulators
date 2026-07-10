class HttpRequest:
    def __init__(self, method, url, headers=None, body=None,
                 timeout_ms=None, retries=None, follow_redirects=None):
        ...  # assign all seven

# At the call site, nobody can read this:
HttpRequest("POST", "/api/orders", {"Content-Type": "application/json"},
            '{"id":7}', None, 3, True)
#                       ^^^^  ^  ^^^^  what is None? 3? True?