// The reservation record: which copy, which member, when it's due.
public class Loan {
    public final String id, barcode, memberId;
    public final long borrowedAt, dueAt;
    public Long returnedAt;
    public double fine;
    public Loan(String id, String barcode, String memberId, long borrowedAt, long dueAt) {
        this.id = id; this.barcode = barcode; this.memberId = memberId;
        this.borrowedAt = borrowedAt; this.dueAt = dueAt;
    }
}