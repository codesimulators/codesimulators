import { PaymentOrchestrator } from './PaymentOrchestrator';
import { StripeGateway } from './StripeGateway';
import { RazorpayGateway } from './RazorpayGateway';
import { RetryPolicy } from './RetryPolicy';

const gateway = new PaymentOrchestrator([new StripeGateway(), new RazorpayGateway()], new RetryPolicy(3));

const result = gateway.charge('order-42', 4999, 'k-charge-1');
console.log(result);
// Stripe fails 3 times (its retry budget), fails over to Razorpay, which succeeds:
// { status: 'SUCCEEDED', provider: 'Razorpay', providerRef: 'razorpay_k-charge-1' }

const retried = gateway.charge('order-42', 4999, 'k-charge-1');   // SAME key
console.log(retried === result);   // true — served straight from the idempotency cache