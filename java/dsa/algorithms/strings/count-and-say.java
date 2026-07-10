public String countAndSay(int n) {
  String sequence = "1";
  for (int i = 1; i < n; i++) {
    StringBuilder nextSequence = new StringBuilder();
    for (int j = 0; j < sequence.length(); j++) {
      int count = 1;
      while (j + 1 < sequence.length() && 
             sequence.charAt(j) == sequence.charAt(j+1)) {
        count++;
        j++;
      }
      nextSequence.append(count).append(sequence.charAt(j));
    }
    sequence = nextSequence.toString();
  }
  return sequence;
}