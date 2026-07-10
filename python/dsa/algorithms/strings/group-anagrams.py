def groupAnagrams(strs: List[str]) -> List[List[str]]:
  groups = {}
  
  for s in strs:
    freq = [0] * 26
    for c in s:
      freq[ord(c) - ord('a')] += 1
      
    key = ''
    for i in range(26):
      if freq[i] > 0:
        key += chr(ord('a') + i) + str(freq[i])
        
    if key not in groups:
      groups[key] = []
    groups[key].append(s)
    
  return list(groups.values())