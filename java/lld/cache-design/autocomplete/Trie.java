import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Trie {
    private final TrieNode root = new TrieNode();
    private final Map<String, Double> scores = new HashMap<>();

    private static String normalize(String text) { return text.trim().toLowerCase(); }

    // The root node + insert/query. Query is a walk to the prefix node
    // followed by a cache read — never a scan over every completion.
    public void insert(String text, double score) {
        String key = normalize(text);
        scores.put(key, score);
        ScoredPhrase phrase = new ScoredPhrase(key, score);

        List<TrieNode> path = new ArrayList<>();
        path.add(root);
        TrieNode node = root;
        for (char ch : key.toCharArray()) {
            node = node.childFor(ch);
            path.add(node);
        }
        node.isEndOfWord = true;

        for (int i = path.size() - 1; i >= 0; i--) path.get(i).mergeTopK(phrase);   // walk back UP
    }

    public void incrementScore(String text, double delta) {
        String key = normalize(text);
        double newScore = scores.getOrDefault(key, 0.0) + delta;
        insert(key, newScore);   // re-inserting re-runs the same walk-up merge
    }

    public List<ScoredPhrase> query(String prefix) {
        TrieNode node = root;
        for (char ch : normalize(prefix).toCharArray()) {
            TrieNode next = node.children.get(ch);
            if (next == null) return new ArrayList<>();   // no phrase shares this prefix
            node = next;
        }
        return node.topK;   // already ranked — just read it
    }
}