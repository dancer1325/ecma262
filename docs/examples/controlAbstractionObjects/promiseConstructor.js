// 1.   global object's `.Promise`'s initial value
console.log(global.Promise);
console.log(globalThis.Promise);

// 2.   new Promise
const promise = new Promise((resolve, reject) => {
  resolve("Done!");
});
console.log(promise);

// 3.   NOT call it -- as a -- function
// Reason: throws an error
/*
Promise((resolve, reject) => {    // TypeError: Promise constructor cannot be invoked without 'new'
  resolve("success");
});
Promise();
Promise(() => {});
Promise.call(null, () => {});
Promise.apply(null, [() => {}]); */

// 4.   promise subclass's constructor / extend `Promise`'s constructor
class MyPromise extends Promise {
  // Add custom functionality
  finally(onFinally) {
    return super.finally(onFinally);
  }
}

// constructor here   == extension of Promise's constructor
const promise = new MyPromise((resolve, reject) => {
  resolve("success");
});

// 5.   promise subclass's constructor / -- intend to inherit the -- Promise behaviour
class AnotherPromise extends Promise {
  constructor(executor) {
    // REQUIRED -- to call -- super
    // COMMENT it -- to see the -- error
    super(executor);
  }
}
