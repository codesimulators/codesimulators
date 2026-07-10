from __future__ import annotations
from abc import ABC, abstractmethod
from typing import Dict, List


class Split(ABC):
    """Strategy interface: turn a total (in cents) + participant list into a
    validated per-person share map. Every concrete split must sum EXACTLY
    back to the total — no float remainders."""

    @abstractmethod
    def compute_shares(self, total_cents: int, participant_ids: List[str]) -> Dict[str, int]: ...