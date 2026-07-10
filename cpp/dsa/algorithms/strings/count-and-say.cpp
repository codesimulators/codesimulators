string countAndSay(int n) {
  string sequence = "1";
  for (int i = 1; i < n; i++) {
    string nextSequence = "";
    for (int j = 0; j < sequence.length(); j++) {
      int count = 1;
      while (j + 1 < sequence.length() && 
             sequence[j] == sequence[j+1]) {
        count++;
        j++;
      }
      nextSequence += to_string(count) + sequence[j];
    }
    sequence = nextSequence;
  }
  return sequence;
}