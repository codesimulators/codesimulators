import time
from rate_limiter import RateLimiter
from token_bucket_strategy import TokenBucketStrategy

limiter = RateLimiter(TokenBucketStrategy(5, 1 / 200))  # 5 tokens, 1 per 200ms

for _ in range(6):
    result = limiter.is_allowed("client-1", time.time() * 1000)
    print(result.allowed, result.retry_after_ms)
# 5x "True 0", then "False ~200"