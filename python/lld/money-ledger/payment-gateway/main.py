from payment_orchestrator import PaymentOrchestrator
from retry_policy import RetryPolicy
from razorpay_gateway import RazorpayGateway
from stripe_gateway import StripeGateway

gateway = PaymentOrchestrator([StripeGateway(), RazorpayGateway()], RetryPolicy(3))

result = gateway.charge("order-42", 4999, "k-charge-1")
print(result)
# Stripe fails 3 times (its retry budget), fails over to Razorpay, which succeeds:
# PaymentResult(status='SUCCEEDED', provider='Razorpay', provider_ref='razorpay_k-charge-1')

retried = gateway.charge("order-42", 4999, "k-charge-1")   # SAME key
print(retried is result)   # True — served straight from the idempotency cache