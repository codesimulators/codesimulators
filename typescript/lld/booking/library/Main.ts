import { Book } from './Book';
import { BookCopy } from './BookCopy';
import { Member } from './Member';
import { PerDayFine } from './FineStrategy';
import { LibraryService } from './LibraryService';

const dune = new Book('978-DUNE', 'Dune', 'Herbert');
dune.copies.push(new BookCopy('BC-1', dune.isbn), new BookCopy('BC-2', dune.isbn));

const alice = new Member('m1', 'Alice', 5);
const svc = new LibraryService(
    new Map([[dune.isbn, dune]]),
    new Map([[alice.id, alice]]),
    new PerDayFine(2),   // $2 / overdue day
);

const day = 86_400_000;
const loan = svc.checkout('m1', '978-DUNE');
console.log(loan ? 'Loaned ' + loan.barcode + ', due in 14d' : 'Unavailable');

// Returned 16 days later → 2 days overdue → fine.
const fine = svc.returnBook(loan!.barcode, '978-DUNE', loan!.borrowedAt + 16 * day);
console.log('Fine: $' + fine);   // 2 days * $2 = $4