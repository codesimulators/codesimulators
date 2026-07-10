import { ScoredPhrase } from './ScoredPhrase';

const TOP_K = 3;

// Same shape whether internal or a leaf — every node carries its own
// pre-merged top-K cache, not just the leaves.
export class TrieNode {
    children = new Map<string, TrieNode>();
    isEndOfWord = false;
    topK: ScoredPhrase[] = [];

    childFor(ch: string): TrieNode {
        let child = this.children.get(ch);
        if (!child) { child = new TrieNode(); this.children.set(ch, child); }
        return child;
    }

    // Merge a phrase into this node's cache, keeping only the top K by
    // score. Called on every ancestor during insert/update — O(K) per node.
    mergeTopK(phrase: ScoredPhrase): void {
        const withoutOld = this.topK.filter(p => p.text !== phrase.text);
        this.topK = [...withoutOld, phrase].sort((a, b) => b.score - a.score).slice(0, TOP_K);
    }
}