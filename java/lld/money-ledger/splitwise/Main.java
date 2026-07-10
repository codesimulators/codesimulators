import java.util.List;

public class Main {
    public static void main(String[] args) {
        Group trip = new Group();

        trip.addExpense("alice", 6000, List.of("alice", "bob", "carol", "dave"), new EqualSplit());
        trip.addExpense("bob", 4000, List.of("bob", "carol"), new EqualSplit());
        trip.addExpense("carol", 1200, List.of("alice", "carol", "dave"), new EqualSplit());

        System.out.println(trip.getBalances());
        // {alice=4100, bob=500, carol=-2700, dave=-1900}  (cents)

        for (SettlementService.Transaction t : trip.simplifyDebts()) {
            System.out.println(t.from + " -> " + t.to + " : " + t.amountCents);
        }
        // carol -> alice : 2700
        // dave  -> alice : 1400
        // dave  -> bob   : 500
    }
}