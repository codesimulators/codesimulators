type Amplifier struct{}
func (Amplifier) On() {}
func (Amplifier) SetVolume(v int) {}

type Lights struct{}
func (Lights) Dim(pct int) {}

type Projector struct{}
func (Projector) On() {}
func (Projector) Wide() {}