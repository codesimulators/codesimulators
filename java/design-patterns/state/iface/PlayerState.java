interface PlayerState {
    void play(Player p);
    void pause(Player p);
    void stop(Player p);
    String name();
}