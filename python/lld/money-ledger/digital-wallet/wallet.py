class Wallet:
    """Deliberately holds no balance field — the ledger is the only source
    of truth for how much a wallet has."""

    def __init__(self, id: str, owner: str):
        self.id = id
        self.owner = owner