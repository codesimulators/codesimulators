import threading
from collections import defaultdict, deque
from typing import Dict, Optional
from models import Book, Member, Loan
from enums import CopyStatus
from fine import FineStrategy

LOAN_MS = 14 * 86_400_000   # 14-day loan


# Orchestrator: limits, due dates, fines, reservation queue.
class LibraryService:
    def __init__(self, books: Dict[str, Book], members: Dict[str, Member], fine: FineStrategy):
        self._books = books
        self._members = members
        self._fine = fine
        self._reservations: Dict[str, deque] = defaultdict(deque)
        self._counter = 0
        self._lock = threading.Lock()

    def checkout(self, member_id: str, isbn: str, now: float) -> Optional[Loan]:
        with self._lock:
            member = self._members.get(member_id)
            book = self._books.get(isbn)
            if member is None or book is None or member.at_limit():
                return None
            copy = next((c for c in book.copies if c.is_available()), None)
            if copy is None:
                self.reserve(member_id, isbn)
                return None
            copy.status = CopyStatus.LOANED
            self._counter += 1
            loan = Loan(f"L{self._counter}", copy.barcode, member_id, now, now + LOAN_MS)
            member.loans.append(loan)
            return loan

    def return_book(self, barcode: str, isbn: str, now: float) -> float:
        with self._lock:
            book = self._books[isbn]
            copy = next(c for c in book.copies if c.barcode == barcode)
            member = next(m for m in self._members.values()
                          if any(l.barcode == barcode and l.returned_at is None for l in m.loans))
            loan = next(l for l in member.loans if l.barcode == barcode and l.returned_at is None)

            loan.returned_at = now
            loan.fine = self._fine.compute(loan, now)
            copy.status = CopyStatus.AVAILABLE

            q = self._reservations.get(isbn)
            if q:
                copy.status = CopyStatus.RESERVED
                q.popleft()          # hand to next in line
            return loan.fine

    def reserve(self, member_id: str, isbn: str) -> None:
        if member_id not in self._reservations[isbn]:
            self._reservations[isbn].append(member_id)