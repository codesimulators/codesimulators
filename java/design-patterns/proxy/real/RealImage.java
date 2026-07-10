class RealImage implements Image {
    private final String file;
    RealImage(String file) {
        System.out.println("loading " + file);  // heavy
        this.file = file;
    }
    public String display() { return "img " + file; }
}