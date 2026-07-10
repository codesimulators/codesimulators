from typing import List, Optional
from enums import CopyStatus


# A single lendable UNIT — the real inventory.
class BookCopy:
    def __init__(self, barcode: str, isbn: str):
        self.barcode = barcode
        self.isbn = isbn
        self.status = CopyStatus.AVAILABLE

    def is_available(self) -> bool:
        return self.status == CopyStatus.AVAILABLE


# The TITLE (metadata), shared by many copies.
class Book:
    def __init__(self, isbn: str, title: str, author: str):
        self.isbn = isbn
        self.title = title
        self.author = author
        self.copies: List[BookCopy] = []


class Loan:
    def __init__(self, loan_id: str, barcode: str, member_id: str,
                 borrowed_at: float, due_at: float):
        self.id = loan_id
        self.barcode = barcode
        self.member_id = member_id
        self.borrowed_at = borrowed_at
        self.due_at = due_at
        self.returned_at: Optional[float] = None
        self.fine = 0.0


class Member:
    def __init__(self, member_id: str, name: str, max_books: int = 5):
        self.id = member_id
        self.name = name
        self.max_books = max_books
        self.loans: List[Loan] = []

    def at_limit(self) -> bool:
        return len(self.loans) >= self.max_books