function put(key, value) {
  const hash = calculateHash(key);
  const index = hash % tableSize;
  if (!table[index]) {
    table[index] = [];
  }
  table[index].push({ key, value });
}

// Main execution
put("apple", 5);