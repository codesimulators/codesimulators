class RequestBuilder:
    def __init__(self):
        self._req = {"method": "GET", "url": "", "headers": {}}

    def method(self, m): self._req["method"] = m; return self
    def url(self, u):    self._req["url"] = u;    return self
    def header(self, k, v):
        self._req["headers"][k] = v; return self
    def body(self, b):   self._req["body"] = b;   return self

    def build(self):
        if not self._req["url"]:
            raise ValueError("url is required")
        return self._req