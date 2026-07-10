class Player:
    def __init__(self):
        self.is_playing = False
        self.is_paused  = False

    def play(self):
        if self.is_playing: return               # already playing
        self.is_paused = False
        self.is_playing = True                   # stopped/paused -> play

    def pause(self):
        if not self.is_playing: return           # ❌ can't pause if not playing
        self.is_playing = False
        self.is_paused = True

    def stop(self):
        # ❌ every method re-checks the same flags
        self.is_playing = False
        self.is_paused = False