class NaiveTree {
    private String name;
    private String color;
    private byte[] textureData; // ❌ 1MB per tree instance
    private int x, y;

    public NaiveTree(String name, String color, int x, int y) {
        this.name = name;
        this.color = color;
        this.textureData = new byte[1024 * 1024];
        this.x = x;
        this.y = y;
    }
}