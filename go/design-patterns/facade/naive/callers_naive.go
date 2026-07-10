// The living-room "Movie Night" button:
func movieNightButton() {
    amp := Amplifier{}; lights := Lights{}
    projector := Projector{}; box := StreamingBox{}

    lights.Dim(10)                 // ❌ caller must know all six APIs
    projector.On()
    projector.Wide()
    amp.On()
    amp.SetVolume(7)
    box.Play("Dune")               // …and the exact ORDER
}
// The mobile app and voice assistant repeat the same dance.