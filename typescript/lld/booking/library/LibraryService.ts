import { Book } from './Book';
import { Member } from './Member';
import { Loan } from './Loan';
import { CopyStatus } from './enums';
import { FineStrategy } from './FineStrategy';

const LOAN_MS = 14 * 86_400_000;   // 14-day loan

// Orchestrator. Enforces limits, sets due dates, prices fines, runs the
// reservation queue.
export class LibraryService {
    private readonly reservations = new Map<string, string[]>();   // isbn -> [memberId]
    private counter = 0;

    constructor(
        private readonly books: Map<string, Book>,     // isbn -> Book
        private readonly members: Map<string, Member>,
        private readonly fine: FineStrategy,
    ) {}

    // CHECKOUT — respect the member limit, claim a free copy, set the due date.
    checkout(memberId: string, isbn: string, now = Date.now()): Loan | null {
        const member = this.members.get(memberId);
        const book = this.books.get(isbn);
        if (!member || !book || member.atLimit()) return null;

        const copy = book.copies.find(c => c.isAvailable());
        if (!copy) { this.reserve(memberId, isbn); return null; }   // none free → queue

        copy.status = CopyStatus.LOANED;                            // claim
        const loan = new Loan('L' + (++this.counter), copy.barcode, memberId, now, now + LOAN_MS);
        member.loans.push(loan);
        return loan;
    }

    // RETURN — price any fine, free the copy, then hand it to the next in queue.
    returnBook(barcode: string, isbn: string, now = Date.now()): number {
        const book = this.books.get(isbn)!;
        const copy = book.copies.find(c => c.barcode === barcode)!;
        const member = [...this.members.values()].find(m => m.loans.some(l => l.barcode === barcode && !l.returnedAt))!;
        const loan = member.loans.find(l => l.barcode === barcode && !l.returnedAt)!;

        loan.returnedAt = now;
        loan.fine = this.fine.compute(loan, now);
        copy.status = CopyStatus.AVAILABLE;

        const queue = this.reservations.get(isbn);
        if (queue && queue.length) {
            copy.status = CopyStatus.RESERVED;                      // hold for next
            const next = queue.shift()!;
            // ...notify member 'next' that a copy is ready...
            void next;
        }
        return loan.fine;
    }

    reserve(memberId: string, isbn: string): void {
        const q = this.reservations.get(isbn) ?? [];
        if (!q.includes(memberId)) q.push(memberId);
        this.reservations.set(isbn, q);
    }
}