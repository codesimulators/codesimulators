// The elevator's tiny state space: which way it's travelling, and whether the
// doors are open. Together these gate what step() is allowed to do next.
export enum Direction { UP = 'UP', DOWN = 'DOWN', IDLE = 'IDLE' }
export enum DoorState { OPEN = 'OPEN', CLOSED = 'CLOSED' }