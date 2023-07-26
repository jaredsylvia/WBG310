const { Fruit } = require('./fruit');

// Creating a new Fruit instance
const banana = new Fruit();

// Using the setter methods
banana.name = 'banana';
banana.color = 'yellow';

// Using the getter methods
console.log('Fruit Name:', banana.name);
console.log('Fruit Color:', banana.color);

// JavaScript allows access to "private" variables and methods from outside the class.
// You shouldn't do this, but it's possible.S

// Accessing "private" variables (not recommended)
console.log('Private Name:', banana._name);
console.log('Private Color:', banana._color);

// Accessing "private" methods (not recommended)
console.log('Private toLowerCase:', banana._toLowerCase('Test'));
console.log('Private capitalizeFirstLetter:', banana._capitalizeFirstLetter('test'));
