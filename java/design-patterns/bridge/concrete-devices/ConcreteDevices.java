class Tv implements Device {
    private boolean on = false;
    private int volume = 30;
    public boolean isEnabled() { return on; }
    public void enable() { on = true; }
    public void disable() { on = false; }
    public int getVolume() { return volume; }
    public void setVolume(int p) { volume = Math.max(0, Math.min(100, p)); }
}