import { CopyStatus } from './enums';

// A single lendable UNIT. This is the real inventory, not the title.
export class BookCopy {
    status: CopyStatus = CopyStatus.AVAILABLE;
    constructor(
        public readonly barcode: string,
        public readonly isbn: string,
    ) {}

    isAvailable(): boolean { return this.status === CopyStatus.AVAILABLE; }
}