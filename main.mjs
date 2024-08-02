import HashMap from "./hashmap.mjs";

// Create a new instance of the hash map with a load factor of 0.75
const test = new HashMap(16, 0.75);

// Populate the hash map
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

// Test overwriting existing values
test.set('apple', 'green');
test.set('banana', 'blue');
test.set('carrot', 'dark orange');

// Add a new item to trigger a resize
test.set('moon', 'silver');

// Verify the size of the hash map
console.log('Size after adding all items:', test.length());

// Test retrieval of values
console.log('apple:', test.get('apple')); // Should be 'green'
console.log('banana:', test.get('banana')); // Should be 'blue'
console.log('carrot:', test.get('carrot')); // Should be 'dark orange'
console.log('moon:', test.get('moon')); // Should be 'silver'

// Test existence of keys
console.log('Has key "jacket":', test.has('jacket')); // Should be true
console.log('Has key "not-a-key":', test.has('not-a-key')); // Should be false

// Remove a key
console.log('Removing "kite":', test.remove('kite')); // Should be true
console.log('Has key "kite":', test.has('kite')); // Should be false

// Test length after removal
console.log('Size after removing "kite":', test.length());

// Clear the hash map
test.clear();
console.log('Size after clearing:', test.length()); // Should be 0

// Populate the hash map again and test other methods
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');

// Test keys, values, and entries
console.log('Keys:', test.keys()); // Should list 'apple', 'banana', 'carrot'
console.log('Values:', test.values()); // Should list 'red', 'yellow', 'orange'
console.log('Entries:', test.entries()); // Should list [['apple', 'red'], ['banana', 'yellow'], ['carrot', 'orange']]
