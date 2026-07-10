import java.util.*;

// Orchestrator: limits, due dates, fines, reservation queue.
public class LibraryService {
    private static final long LOAN_MS = 14L * 86_400_000;
    private final Map<String, Book> books;
    private final Map<String, Member> members;
    private final FineStrategy fine;
    private final Map<String, Deque<String>> reservations = new HashMap<>();
    private int counter = 0;

    public LibraryService(Map<String, Book> books, Map<String, Member> members, FineStrategy fine) {
        this.books = books; this.members = members; this.fine = fine;
    }

    public synchronized Loan checkout(String memberId, String isbn, long now) {
        Member member = members.get(memberId);
        Book book = books.get(isbn);
        if (member == null || book == null || member.atLimit()) return null;

        BookCopy copy = null;
        for (BookCopy c : book.copies) if (c.isAvailable()) { copy = c; break; }
        if (copy == null) { reserve(memberId, isbn); return null; }

        copy.status = CopyStatus.LOANED;
        Loan loan = new Loan("L" + (++counter), copy.barcode, memberId, now, now + LOAN_MS);
        member.loans.add(loan);
        return loan;
    }

    public synchronized double returnBook(String barcode, String isbn, long now) {
        Book book = books.get(isbn);
        BookCopy copy = book.copies.stream().filter(c -> c.barcode.equals(barcode)).findFirst().get();
        Member member = members.values().stream()
            .filter(m -> m.loans.stream().anyMatch(l -> l.barcode.equals(barcode) && l.returnedAt == null))
            .findFirst().get();
        Loan loan = member.loans.stream()
            .filter(l -> l.barcode.equals(barcode) && l.returnedAt == null).findFirst().get();

        loan.returnedAt = now;
        loan.fine = fine.compute(loan, now);
        copy.status = CopyStatus.AVAILABLE;

        Deque<String> q = reservations.get(isbn);
        if (q != null && !q.isEmpty()) { copy.status = CopyStatus.RESERVED; q.poll(); }
        return loan.fine;
    }

    public void reserve(String memberId, String isbn) {
        reservations.computeIfAbsent(isbn, k -> new ArrayDeque<>());
        if (!reservations.get(isbn).contains(memberId)) reservations.get(isbn).add(memberId);
    }
}