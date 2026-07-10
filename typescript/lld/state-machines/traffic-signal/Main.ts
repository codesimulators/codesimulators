import { IntersectionController } from './IntersectionController';

const junction = new IntersectionController();

// Simulate 70 seconds, one second at a time.
for (let t = 0; t <= 70; t += 5) {
    junction.tick(5);
    console.log(`t=${t}s  ${junction.state()}`);
}
// NS runs GREEN→YELLOW→RED, and exactly as it hits RED the EW axis is
// released to GREEN. The invariant check never fires.