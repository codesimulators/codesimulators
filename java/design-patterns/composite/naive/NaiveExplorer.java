class File {
    String name;
    int size;
}
class Directory {
    String name;
    List<File> files = new ArrayList<>();
    List<Directory> subdirs = new ArrayList<>();
}
// Client has to traverse and perform type checking manually
int getSize(Directory dir) {
    int total = 0;
    for (File f : dir.files) total += f.size;
    for (Directory d : dir.subdirs) total += getSize(d);
    return total;
}