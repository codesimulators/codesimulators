public class TreeFactory {
    private static final Map<String, TreeType> types = new HashMap<>();

    public static TreeType getTreeType(String name, String color) {
        String key = name + "_" + color;
        if (!types.containsKey(key)) {
            types.put(key, new TreeType(name, color));
        }
        return types.get(key);
    }
}