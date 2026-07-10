from models import Room, TimeSlot
from service import SchedulerService


def at(h: int, m: int = 0) -> int:
    return h * 60 + m


def main():
    svc = SchedulerService([Room("R1", 6), Room("R2", 12)])
    svc.book("R1", "alice", TimeSlot(at(9), at(10)), 4)
    svc.book("R1", "bob", TimeSlot(at(10), at(11)), 3)

    print("overlap book:", svc.book("R1", "carol", TimeSlot(at(9, 30), at(10, 30)), 2))  # None
    s = svc.suggest_next_slot("R1", 30, at(9), at(17))
    print("next 30m slot:", f"{s.start}-{s.end}" if s else "none")   # 660-690


if __name__ == "__main__":
    main()