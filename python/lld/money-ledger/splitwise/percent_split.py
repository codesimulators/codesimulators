from split import Split


class PercentSplit(Split):
    """Percentages must sum to 100; cents are floored per person and the
    leftover pennies handed out the same deterministic way as EqualSplit."""

    def __init__(self, percentages: dict):
        self._percentages = percentages

    def compute_shares(self, total_cents, participant_ids):
        pct_sum = sum(self._percentages.get(pid, 0) for pid in participant_ids)
        if pct_sum != 100:
            raise ValueError(f"percentages ({pct_sum}) must sum to 100")

        base = [(total_cents * self._percentages[pid]) // 100 for pid in participant_ids]
        remainder = total_cents - sum(base)

        shares = {}
        for i, pid in enumerate(participant_ids):
            bump = 1 if remainder > 0 else 0
            shares[pid] = base[i] + bump
            remainder -= bump
        return shares