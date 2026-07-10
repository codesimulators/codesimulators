import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Same shape whether internal or a leaf — every node carries its own
// pre-merged top-K cache, not just the leaves.
public class TrieNode {
    private static final int TOP_K = 3;

    public final Map<Character, TrieNode> children = new HashMap<>();
    public boolean isEndOfWord = false;
    public List<ScoredPhrase> topK = new ArrayList<>();

    public TrieNode childFor(char ch) {
        return children.computeIfAbsent(ch, c -> new TrieNode());
    }

    // Merge a phrase into this node's cache, keeping only the top K by
    // score. Called on every ancestor during insert/update — O(K) per node.
    public void mergeTopK(ScoredPhrase phrase) {
        List<ScoredPhrase> merged = new ArrayList<>();
        for (ScoredPhrase p : topK) if (!p.text.equals(phrase.text)) merged.add(p);
        merged.add(phrase);
        merged.sort(Comparator.comparingDouble((ScoredPhrase p) -> p.score).reversed());
        topK = merged.subList(0, Math.min(TOP_K, merged.size()));
    }
}