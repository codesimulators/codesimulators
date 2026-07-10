from dataclasses import dataclass


@dataclass
class ScoredPhrase:
    """A value object: the full text + its relevance score."""
    text: str
    score: float

    def __repr__(self):
        return f"{self.text}({self.score})"