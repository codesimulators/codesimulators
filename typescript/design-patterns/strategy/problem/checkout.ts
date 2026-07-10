// One method that knows EVERY payment provider.
function charge(amount: number, method: string) {
  if (method === "card") {
    const fee = amount * 0.029 + 0.30;      // Stripe-style fee
    return amount + fee;
  } else if (method === "paypal") {
    const fee = amount * 0.0349 + 0.49;
    return amount + fee;
  } else if (method === "crypto") {
    const fee = amount * 0.01;
    return amount + fee;
  }
  // A new provider = edit this function AGAIN.
  throw new Error("Unknown method: " + method);
}