public enum SeatType { REGULAR, PREMIUM }

// A seat's lifecycle for ONE show. HELD prevents double-booking.
enum SeatStatus { AVAILABLE, HELD, BOOKED }

enum BookingStatus { PENDING, CONFIRMED, CANCELLED }