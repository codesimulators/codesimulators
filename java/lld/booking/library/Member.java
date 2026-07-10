import java.util.*;

public class Member {
    public final String id, name;
    public final int maxBooks;
    public final List<Loan> loans = new ArrayList<>();
    public Member(String id, String name, int maxBooks) {
        this.id = id; this.name = name; this.maxBooks = maxBooks;
    }
    public boolean atLimit() { return loans.size() >= maxBooks; }
}