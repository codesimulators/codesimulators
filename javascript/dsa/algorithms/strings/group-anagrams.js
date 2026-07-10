function groupAnagrams(strs) {
  const map = new Map();
  
  for (const s of strs) {
    const freq = new Array(26).fill(0);
    for (const c of s) {
      freq[c.charCodeAt(0) - 97]++;
    }
    
    let key = '';
    for (let i = 0; i < 26; i++) {
      if (freq[i] > 0) {
        key += String.fromCharCode(i + 97) + freq[i];
      }
    }
    
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(s);
  }
  
  return Array.from(map.values());
}