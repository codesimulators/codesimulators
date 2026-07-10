import { Room } from './Room';
import { TimeSlot } from './TimeSlot';
import { SchedulerService } from './SchedulerService';

// minutes-from-midnight helper: 10:00 -> 600
const at = (h: number, m = 0) => h * 60 + m;

const svc = new SchedulerService([new Room('R1', 6), new Room('R2', 12)]);

svc.book('R1', 'alice', new TimeSlot(at(9), at(10)), 4);
svc.book('R1', 'bob',   new TimeSlot(at(10), at(11)), 3);

// Conflicting request 09:30–10:30 on R1 → rejected.
console.log('overlap book:', svc.book('R1', 'carol', new TimeSlot(at(9, 30), at(10, 30)), 2));  // null

// Suggest the earliest 30-min slot on R1 between 09:00 and 17:00.
const s = svc.suggestNextSlot('R1', 30, at(9), at(17));
console.log('next 30m slot:', s ? s.start + '-' + s.end : 'none');   // 660-690 (11:00-11:30)