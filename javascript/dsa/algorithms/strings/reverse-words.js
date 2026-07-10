function reverseWords(s) {
  const words = s.trim().split(/\s+/);
  const res = [];
  
  for (let i = words.length - 1; i >= 0; i--) {
    res.push(words[i]);
  }
  
  return res.join(' ');
}