def movie_night_button():
    amp = Amplifier(); lights = Lights()
    projector = Projector(); box = StreamingBox()

    lights.dim(10)                 # ❌ caller must know all six APIs
    projector.on(); projector.wide()
    amp.on(); amp.set_volume(7)
    box.play("Dune")               # …and the exact ORDER

# The mobile app and the voice assistant repeat the same dance.
# Change the order once -> fix it everywhere.