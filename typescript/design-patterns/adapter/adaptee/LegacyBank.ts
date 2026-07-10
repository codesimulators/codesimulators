// What we actually HAVE: a legacy SDK with an awkward API.
class LegacyBank {
  makePayment(cents: number, currency: string) {
    return { status: 0, txn: "LB-" + cents + currency };  // 0 = success
  }
}