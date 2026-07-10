import { ScoredPhrase } from './ScoredPhrase';
import { TrieNode } from './TrieNode';

function normalize(text: string): string {
    return text.trim().toLowerCase();
}

// The root node + insert/query. Query is a walk to the prefix node
// followed by a cache read — never a scan over every completion.
export class Trie {
    private root = new TrieNode();
    private scores = new Map<string, number>();

    insert(text: string, score: number): void {
        const key = normalize(text);
        this.scores.set(key, score);
        const phrase: ScoredPhrase = { text: key, score };

        const path: TrieNode[] = [this.root];
        let node = this.root;
        for (const ch of key) {
            node = node.childFor(ch);
            path.push(node);
        }
        node.isEndOfWord = true;

        for (let i = path.length - 1; i >= 0; i--) path[i].mergeTopK(phrase);   // walk back UP
    }

    incrementScore(text: string, delta: number): void {
        const key = normalize(text);
        const newScore = (this.scores.get(key) ?? 0) + delta;
        this.insert(key, newScore);   // re-inserting re-runs the same walk-up merge
    }

    query(prefix: string): ScoredPhrase[] {
        let node = this.root;
        for (const ch of normalize(prefix)) {
            const next = node.children.get(ch);
            if (!next) return [];             // no phrase shares this prefix
            node = next;
        }
        return node.topK;                     // already ranked — just read it
    }
}