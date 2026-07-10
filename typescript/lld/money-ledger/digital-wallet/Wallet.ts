// Deliberately holds no balance field — the ledger is the only source of
// truth for how much a wallet has.
export class Wallet {
    constructor(readonly id: string, readonly owner: string) {}
}