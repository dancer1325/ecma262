// TODO:

// 7.   Promise.resolve()
// 7.1    returns     NEW promise resolved
// 7.1.1      SIMPLE arguments
const p1 = Promise.resolve(42);
const p2 = Promise.resolve("hello");
const p3 = Promise.resolve(true);

p1.then(value => console.log(value)); // 42
p2.then(value => console.log(value)); // "hello"
p3.then(value => console.log(value)); // true

// 7.1.2      object
const p4 = Promise.resolve({ name: "John" });
p4.then(obj => console.log(obj.name)); // "John"

// 7.2    returns     a Promise
const originalPromise = new Promise(resolve => resolve("original"));
const resolvedPromise = Promise.resolve(originalPromise);

console.log(originalPromise === resolvedPromise); // true - same instance

// TODO:
