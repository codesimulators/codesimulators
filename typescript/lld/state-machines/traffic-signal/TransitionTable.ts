import { SignalColor } from './SignalColor';

// The transition TABLE is the machine's brain: for each colour, what comes
// next and how long it must hold. Changing timing or order is data, not code.
export interface Phase { next: SignalColor; holdSec: number }

export const TRANSITIONS: Record<SignalColor, Phase> = {
    [SignalColor.RED]:    { next: SignalColor.GREEN,  holdSec: 30 },
    [SignalColor.GREEN]:  { next: SignalColor.YELLOW, holdSec: 25 },
    [SignalColor.YELLOW]: { next: SignalColor.RED,    holdSec: 5  },
};