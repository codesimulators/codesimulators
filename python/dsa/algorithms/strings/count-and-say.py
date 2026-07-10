def countAndSay(n: int) -> str:
  sequence = '1'
  for _ in range(1, n):
    next_seq, i = [], 0
    while i < len(sequence):
      count = 1
      while i + 1 < len(sequence) and \
            sequence[i] == sequence[i+1]:
        count += 1
        i += 1
      next_seq.append(str(count) + sequence[i])
      i += 1
    sequence = ''.join(next_seq)
  return sequence