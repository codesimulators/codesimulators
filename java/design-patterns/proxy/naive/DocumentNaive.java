class Document {
    private final List<RealImage> images = new ArrayList<>();
    Document(List<String> files) {
        // ❌ every image decodes NOW, even ones never viewed
        for (String f : files) images.add(new RealImage(f)); // ~24MB EACH
    }
    String show(int i) { return images.get(i).display(); }
}
// new Document(fiftyFiles) -> 50 decodes before anything is shown.