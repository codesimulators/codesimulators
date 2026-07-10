export enum SeatType { REGULAR, PREMIUM }

// A seat's lifecycle for ONE show. The HELD state is what prevents
// double-booking: a seat is briefly reserved before payment.
export enum SeatStatus { AVAILABLE, HELD, BOOKED }