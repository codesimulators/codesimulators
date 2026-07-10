from split import Split


class ExactSplit(Split):
    """Caller supplies the exact cents each participant owes; we only
    verify they add up — this split never invents a number."""

    def __init__(self, amounts: dict):
        self._amounts = amounts

    def compute_shares(self, total_cents, participant_ids):
        total = sum(self._amounts.get(pid, 0) for pid in participant_ids)
        if total != total_cents:
            raise ValueError(f"exact shares ({total}) must sum to total ({total_cents})")
        return {pid: self._amounts[pid] for pid in participant_ids}