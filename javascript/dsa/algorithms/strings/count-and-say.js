function countAndSay(n) {
  let sequence = '1';
  for (let i = 1; i < n; i++) {
    let nextSequence = '';
    let j = 0;
    while (j < sequence.length) {
      let count = 1;
      while (j + 1 < sequence.length && sequence[j] === sequence[j + 1]) {
        count++;
        j++;
      }
      nextSequence += count.toString() + sequence[j];
      j++;
    }
    sequence = nextSequence;
  }
  return sequence;
}