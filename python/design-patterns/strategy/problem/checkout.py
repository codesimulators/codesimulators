def charge(amount, method):
    if method == "card":
        fee = amount * 0.029 + 0.30
        return amount + fee
    elif method == "paypal":
        fee = amount * 0.0349 + 0.49
        return amount + fee
    elif method == "crypto":
        fee = amount * 0.01
        return amount + fee
    # A new provider = edit this function AGAIN.
    raise ValueError("Unknown method: " + method)