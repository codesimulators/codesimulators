import { KVStore } from './KVStore';
import { Sweeper } from './Sweeper';

const store = new KVStore<string>();
const sweeper = new Sweeper(store);

store.set('session:9', 'alice', 50);    // expires in 50ms
store.set('cache:x', 'result', 500);     // expires in 500ms

console.log(store.get('session:9'));     // 'alice'

setTimeout(() => {
    sweeper.tick();                       // proactively reclaims session:9
    console.log(store.get('session:9'));  // null — expired and swept
    console.log(store.get('cache:x'));    // 'result' — untouched
}, 100);