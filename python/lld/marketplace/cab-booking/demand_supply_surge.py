from surge_strategy import SurgeStrategy


class DemandSupplySurge(SurgeStrategy):
    def multiplier(self, open_requests: int, available_drivers: int) -> float:
        if available_drivers == 0:
            return 3.0                          # cap even with zero supply
        ratio = open_requests / available_drivers
        return min(3.0, max(1.0, ratio))          # 1.0x floor, 3.0x cap