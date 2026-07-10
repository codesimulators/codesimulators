// A min-heap keyed by expiry time. The sweeper only ever looks at the
// earliest entry — it never scans keys that aren't due yet.
export interface QueueItem { key: string; expiresAt: number; }

export class ExpiryQueue {
    private heap: QueueItem[] = [];

    schedule(key: string, expiresAt: number): void {
        this.heap.push({ key, expiresAt });
        this.bubbleUp(this.heap.length - 1);
    }

    peek(): QueueItem | undefined {
        return this.heap[0];
    }

    pop(): QueueItem | undefined {
        if (this.heap.length === 0) return undefined;
        const top = this.heap[0];
        const last = this.heap.pop()!;
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.bubbleDown(0);
        }
        return top;
    }

    private bubbleUp(i: number): void {
        while (i > 0) {
            const parent = (i - 1) >> 1;
            if (this.heap[parent].expiresAt <= this.heap[i].expiresAt) break;
            [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
            i = parent;
        }
    }

    private bubbleDown(i: number): void {
        const n = this.heap.length;
        while (true) {
            let smallest = i;
            const l = 2 * i + 1, r = 2 * i + 2;
            if (l < n && this.heap[l].expiresAt < this.heap[smallest].expiresAt) smallest = l;
            if (r < n && this.heap[r].expiresAt < this.heap[smallest].expiresAt) smallest = r;
            if (smallest === i) break;
            [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
            i = smallest;
        }
    }
}