class Player {
    bool isPlaying = false;
    bool isPaused  = false;
public:
    void play() {
        if (isPlaying) return;                   // already playing
        isPaused = false;
        isPlaying = true;                        // stopped/paused -> play
    }
    void pause() {
        if (!isPlaying) return;                  // ❌ can't pause if not playing
        isPlaying = false; isPaused = true;
    }
    void stop() {
        // ❌ every method re-checks the same flags
        isPlaying = false; isPaused = false;
    }
};