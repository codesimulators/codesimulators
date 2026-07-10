TOP_K = 3


class TrieNode:
    """Same shape whether internal or a leaf — every node carries its own
    pre-merged top-K cache, not just the leaves."""

    def __init__(self):
        self.children = {}
        self.is_end_of_word = False
        self.top_k = []

    def child_for(self, ch: str) -> "TrieNode":
        if ch not in self.children:
            self.children[ch] = TrieNode()
        return self.children[ch]

    def merge_top_k(self, phrase) -> None:
        """Merge a phrase into this node's cache, keeping only the top K
        by score. Called on every ancestor during insert/update —
        O(K) per node."""
        merged = [p for p in self.top_k if p.text != phrase.text] + [phrase]
        merged.sort(key=lambda p: p.score, reverse=True)
        self.top_k = merged[:TOP_K]