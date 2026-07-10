import time
from models import Book, BookCopy, Member
from fine import PerDayFine
from service import LibraryService


def main():
    dune = Book("978-DUNE", "Dune", "Herbert")
    dune.copies += [BookCopy("BC-1", dune.isbn), BookCopy("BC-2", dune.isbn)]

    alice = Member("m1", "Alice", 5)
    svc = LibraryService({dune.isbn: dune}, {alice.id: alice}, PerDayFine(2))

    day = 86_400_000
    now = time.time() * 1000
    loan = svc.checkout("m1", "978-DUNE", now)
    print("Loaned " + loan.barcode if loan else "Unavailable")
    fine = svc.return_book(loan.barcode, "978-DUNE", loan.borrowed_at + 16 * day)
    print("Fine: $" + str(fine))   # 4


if __name__ == "__main__":
    main()