import java.util.*;

public class Main {
    public static void main(String[] args) {
        Book dune = new Book("978-DUNE", "Dune", "Herbert");
        dune.copies.add(new BookCopy("BC-1", dune.isbn));
        dune.copies.add(new BookCopy("BC-2", dune.isbn));

        Member alice = new Member("m1", "Alice", 5);
        LibraryService svc = new LibraryService(
            Map.of(dune.isbn, dune), Map.of(alice.id, alice), new PerDayFine(2));

        long day = 86_400_000, now = System.currentTimeMillis();
        Loan loan = svc.checkout("m1", "978-DUNE", now);
        System.out.println(loan != null ? "Loaned " + loan.barcode : "Unavailable");
        double f = svc.returnBook(loan.barcode, "978-DUNE", loan.borrowedAt + 16 * day);
        System.out.println("Fine: $" + f);   // 4.0
    }
}