func countAndSay(n int) string {
  sequence := "1"
  for i := 1; i < n; i++ {
    var nextSequence strings.Builder
    for j := 0; j < len(sequence); {
      count := 1
      for j+1 < len(sequence) && sequence[j] == sequence[j+1] {
        count++
        j++
      }
      nextSequence.WriteString(strconv.Itoa(count))
      nextSequence.WriteByte(sequence[j])
      j++
    }
    sequence = nextSequence.String()
  }
  return sequence
}