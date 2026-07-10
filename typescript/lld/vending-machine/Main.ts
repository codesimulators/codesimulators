import { VendingMachine } from './VendingMachine';

const vm = new VendingMachine({ COKE: { price: 100, stock: 2 }, WATER: { price: 75, stock: 0 } });

vm.selectProduct('COKE');   // IDLE: no money → ignored
vm.insertCoin(50);          // IDLE → HAS_MONEY, balance 50
vm.insertCoin(50);          // HAS_MONEY: balance 100
vm.selectProduct('WATER');  // sold out → stays HAS_MONEY
vm.selectProduct('COKE');   // balance >= price → DISPENSING
vm.dispense();              // vend COKE, change 0 → IDLE, stock 1
