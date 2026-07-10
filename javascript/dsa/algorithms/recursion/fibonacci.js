function fib(n) {
  if (n <= 1) {
    return n;
  }
  const left = fib(n - 1);
  const right = fib(n - 2);
  return left + right;
}

// Main execution
fib(5);