import { BookCopy } from './BookCopy';

// The TITLE (metadata), shared by many physical copies.
export class Book {
    readonly copies: BookCopy[] = [];
    constructor(
        public readonly isbn: string,
        public readonly title: string,
        public readonly author: string,
    ) {}
}