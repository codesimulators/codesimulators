public class TreeType {
    private String name;
    private String color;
    private byte[] textureData; // Allocated once

    public TreeType(String name, String color) {
        this.name = name;
        this.color = color;
        this.textureData = new byte[1024 * 1024];
    }
    public void draw(int x, int y) {
        // Draw logic using textureData
    }
}