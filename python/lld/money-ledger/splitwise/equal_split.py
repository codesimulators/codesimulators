from split import Split


class EqualSplit(Split):
    """Floors the per-person share, then hands the leftover pennies to the
    first participants in a fixed order — deterministic, never a float."""

    def compute_shares(self, total_cents, participant_ids):
        n = len(participant_ids)
        base = total_cents // n
        remainder = total_cents - base * n
        return {
            pid: base + (1 if i < remainder else 0)
            for i, pid in enumerate(participant_ids)
        }