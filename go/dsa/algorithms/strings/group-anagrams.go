func groupAnagrams(strs []string) [][]string {
  mp := make(map[string][]string)
  
  for _, s := range strs {
    freq := make([]int, 26)
    for _, c := range s {
      freq[c-'a']++
    }
    
    var sb strings.Builder
    for i, count := range freq {
      if count > 0 {
        sb.WriteByte(byte('a' + i))
        sb.WriteString(strconv.Itoa(count))
      }
    }
    
    key := sb.String()
    if _, ok := mp[key]; !ok {
      mp[key] = []string{}
    }
    mp[key] = append(mp[key], s)
  }
  
  return resultFromMap(mp)
}