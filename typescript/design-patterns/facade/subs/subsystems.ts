// A pile of subsystems, each with its own fiddly API.
class Amplifier    { on() {} setVolume(v: number) {} }
class Lights       { dim(pct: number) {} }
class Projector    { on() {} wide() {} }
class StreamingBox { play(title: string) {} }