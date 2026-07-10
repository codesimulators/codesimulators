import java.util.*;

// The TITLE (metadata), shared by many physical copies.
public class Book {
    public final String isbn, title, author;
    public final List<BookCopy> copies = new ArrayList<>();
    public Book(String isbn, String title, String author) {
        this.isbn = isbn; this.title = title; this.author = author;
    }
}