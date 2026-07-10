import { Group } from './Group';
import { EqualSplit } from './EqualSplit';

const trip = new Group();

trip.addExpense('alice', 6000, ['alice', 'bob', 'carol', 'dave'], new EqualSplit()); // dinner $60 / 4
trip.addExpense('bob', 4000, ['bob', 'carol'], new EqualSplit());                    // cab $40 / 2
trip.addExpense('carol', 1200, ['alice', 'carol', 'dave'], new EqualSplit());        // coffee $12 / 3

console.log(trip.getBalances());
// alice: 4100  bob: 500  carol: -2700  dave: -1900   (cents)

for (const t of trip.simplifyDebts()) console.log(`${t.from} -> ${t.to} : ${t.amountCents}`);
// carol -> alice : 2700
// dave  -> alice : 1400
// dave  -> bob   : 500