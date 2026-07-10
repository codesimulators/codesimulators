public class Main {
    public static void main(String[] args) {
        IntersectionController junction = new IntersectionController();
        for (int t = 0; t <= 70; t += 5) {
            junction.tick(5);
            System.out.println("t=" + t + "s  " + junction.state());
        }
    }
}