class CommercialAircraft {
    private String id;
    private List<CommercialAircraft> peers;
    
    // ❌ Extreme peer-to-peer coupling
    void requestLanding() {
        for (CommercialAircraft peer : peers) {
            if (peer.isLanding()) return;
        }
        System.out.println("Landing clear");
    }
}