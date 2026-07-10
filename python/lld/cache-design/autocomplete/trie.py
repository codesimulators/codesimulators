from scored_phrase import ScoredPhrase
from trie_node import TrieNode


def _normalize(text: str) -> str:
    return text.strip().lower()


class Trie:
    """The root node + insert/query. Query is a walk to the prefix node
    followed by a cache read — never a scan over every completion."""

    def __init__(self):
        self._root = TrieNode()
        self._scores = {}

    def insert(self, text: str, score: float) -> None:
        key = _normalize(text)
        self._scores[key] = score
        phrase = ScoredPhrase(key, score)

        path = [self._root]
        node = self._root
        for ch in key:
            node = node.child_for(ch)
            path.append(node)
        node.is_end_of_word = True

        for n in reversed(path):
            n.merge_top_k(phrase)   # walk back UP

    def increment_score(self, text: str, delta: float) -> None:
        key = _normalize(text)
        new_score = self._scores.get(key, 0) + delta
        self.insert(key, new_score)   # re-inserting re-runs the same walk-up merge

    def query(self, prefix: str):
        node = self._root
        for ch in _normalize(prefix):
            if ch not in node.children:
                return []   # no phrase shares this prefix
            node = node.children[ch]
        return node.top_k   # already ranked — just read it