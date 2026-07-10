class Stopped implements PlayerState {
    public String name() { return "Stopped"; }
    public void play(Player p)  { p.setState(new Playing()); }
    public void pause(Player p) {}
    public void stop(Player p)  {}
}