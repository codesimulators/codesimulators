import { Wallet } from './Wallet';
import { Ledger } from './Ledger';
import { IdempotencyStore } from './IdempotencyStore';
import { TransferService, TransferResult, InsufficientFunds } from './TransferService';

// Facade — the only class callers touch. Coordinates wallets, ledgers,
// idempotency and the transfer service; owns no business logic itself.
export class WalletManager {
    private wallets = new Map<string, Wallet>();
    private ledgers = new Map<string, Ledger>();
    private idempotency = new IdempotencyStore();
    private transferService = new TransferService(this.idempotency);

    open(id: string, owner: string): Wallet {
        const wallet = new Wallet(id, owner);
        this.wallets.set(id, wallet);
        this.ledgers.set(id, new Ledger());
        return wallet;
    }

    addMoney(walletId: string, amountCents: number, idempotencyKey: string): void {
        if (this.idempotency.get(idempotencyKey)) return;
        this.ledgerOf(walletId).append('CREDIT', amountCents);
        this.idempotency.put(idempotencyKey, { status: 'OK' });
    }

    pay(walletId: string, amountCents: number, idempotencyKey: string): void {
        if (this.idempotency.get(idempotencyKey)) return;
        const ledger = this.ledgerOf(walletId);
        if (ledger.getBalance() < amountCents) throw new InsufficientFunds();
        ledger.append('DEBIT', amountCents);
        this.idempotency.put(idempotencyKey, { status: 'OK' });
    }

    transfer(fromId: string, toId: string, amountCents: number, idempotencyKey: string): TransferResult {
        return this.transferService.transfer(fromId, this.ledgerOf(fromId), toId, this.ledgerOf(toId), amountCents, idempotencyKey);
    }

    getBalance(walletId: string): number {
        return this.ledgerOf(walletId).getBalance();
    }

    private ledgerOf(walletId: string): Ledger {
        const ledger = this.ledgers.get(walletId);
        if (!ledger) throw new Error(`unknown wallet ${walletId}`);
        return ledger;
    }
}