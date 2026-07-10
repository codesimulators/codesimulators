// A value object: the full text + its relevance score.
public class ScoredPhrase {
    public final String text;
    public final double score;

    public ScoredPhrase(String text, double score) { this.text = text; this.score = score; }

    @Override
    public String toString() { return text + "(" + score + ")"; }
}