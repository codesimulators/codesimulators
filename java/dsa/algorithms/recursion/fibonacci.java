public class Main {
    public int fib(int n) {
        if (n <= 1) {
            return n;
        }
        int left = fib(n - 1);
        int right = fib(n - 2);
        return left + right;
    }
    
    public static void main(String[] args) {
        new Main().fib(5);
    }
}