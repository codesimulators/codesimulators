// Adapter interface — every provider SDK is hidden behind this one contract.
export interface ProviderResult { providerRef: string; }

export class TransientProviderError extends Error {}

export interface PaymentGateway {
    readonly name: string;
    charge(amountCents: number, idempotencyKey: string): ProviderResult;
}