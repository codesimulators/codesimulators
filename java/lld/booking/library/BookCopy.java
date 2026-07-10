// A single lendable UNIT — the real inventory.
public class BookCopy {
    public final String barcode, isbn;
    public CopyStatus status = CopyStatus.AVAILABLE;
    public BookCopy(String barcode, String isbn) { this.barcode = barcode; this.isbn = isbn; }
    public boolean isAvailable() { return status == CopyStatus.AVAILABLE; }
}