def frequencySort(s):
    from collections import Counter
    counts = Counter(s)
    
    n = len(s)
    buckets = [[] for _ in range(n + 1)]
    for char, freq in counts.items():
        buckets[freq].append(char)
        
    res = []
    for f in range(n, 0, -1):
        for char in buckets[f]:
            res.append(char * f)
            
    return "".join(res)