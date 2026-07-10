import { RateLimiter } from './RateLimiter';
import { TokenBucketStrategy } from './TokenBucketStrategy';

const limiter = new RateLimiter(new TokenBucketStrategy(5, 1 / 200));   // 5 tokens, 1 per 200ms

for (let i = 0; i < 6; i++) {
    console.log(limiter.isAllowed('client-1'));
}
// 5x { allowed: true }, then { allowed: false, retryAfterMs: ~200 }