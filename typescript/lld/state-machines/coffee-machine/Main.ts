import { CoffeeMachine } from './CoffeeMachine';
import { Inventory } from './Inventory';

// Enough for one cappuccino's milk only.
const machine = new CoffeeMachine(new Inventory({ beans: 10, water: 10, milk: 2 }));

console.log(machine.brew());              // cannot brew while IDLE
console.log(machine.select('cappuccino')); // selected — insert 320c
console.log(machine.pay(200));            // need 120c more
console.log(machine.pay(200));            // payment ok (overpaid 80)
console.log(machine.brew());              // brewed Cappuccino. change: 80c

console.log(machine.select('latte'));     // out of: milk  (needs 3, have 0)