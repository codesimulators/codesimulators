from dataclasses import dataclass, field

@dataclass
class HttpRequest:
    method: str
    url: str
    headers: dict = field(default_factory=dict)
    body: str | None = None