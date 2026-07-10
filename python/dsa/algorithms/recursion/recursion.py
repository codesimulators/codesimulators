def fib(n):
    if n <= 1:
        return n
    left = fib(n - 1)
    right = fib(n - 2)
    return left + right

if __name__ == "__main__":
    fib(5)