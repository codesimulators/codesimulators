def hIndex(citations):
    n = len(citations)
    buckets = [0] * (n + 1)
    
    for c in citations:
        if c >= n:
            buckets[n] += 1
        else:
            buckets[c] += 1
            
    papers_seen = 0
    for h in range(n, -1, -1):
        papers_seen += buckets[h]
        if papers_seen >= h:
            return h
    return 0