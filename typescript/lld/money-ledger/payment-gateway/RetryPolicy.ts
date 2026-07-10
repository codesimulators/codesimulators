// Strategy: how many attempts per provider, and how long to back off between
// them. Independent of any one provider's behaviour.
export class RetryPolicy {
    constructor(readonly maxAttempts = 3, private baseBackoffMs = 200) {}

    backoffMs(attempt: number): number {
        return this.baseBackoffMs * Math.pow(2, attempt - 1);   // 200, 400, 800, ...
    }
}