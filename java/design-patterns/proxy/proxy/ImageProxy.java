class ImageProxy implements Image {
    private final String file;
    private RealImage real;     // null until first use
    ImageProxy(String file) { this.file = file; }

    public String display() {
        if (real == null) real = new RealImage(file);
        return real.display();
    }
}