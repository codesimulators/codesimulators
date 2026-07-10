double charge(double amount, String method) {
    if (method.equals("card")) {
        double fee = amount * 0.029 + 0.30;
        return amount + fee;
    } else if (method.equals("paypal")) {
        double fee = amount * 0.0349 + 0.49;
        return amount + fee;
    } else if (method.equals("crypto")) {
        double fee = amount * 0.01;
        return amount + fee;
    }
    throw new IllegalArgumentException("Unknown: " + method);
}