// a = 'a';
// best(); // works
// fn(); // undefined is not a function

// a = '1';

// function test(a, b) {
//   var t = 10;


// }

// IIFE

(function () {

})()

// function test() {
//   this
// }

function t() {
  for (var i = 0; i < 10; i++) {
    setTimeout((function (a) {
      return function () {
        console.log(a);
      }
    })(i), 0)
  }

  for (let i = 0; i < 10; i++) {
    setTimeout(function () {
      console.log(i);
    }, 0)
  }

  for (let i = 0; i < 10; i++) {
    setTimeout(function (t) {
      console.log(t);
    }, 0, i)
  }
}


queueMicrotask();
// async function test(params) {
//   await
// }

function* gen() {
  yield 1;


  yield 2;
}


{

}

const obj = {
  i: 1,
  getI: (function () {
    return this.i;
  }).bind(this),
  [Symbol.iterator]: function* () {
    while (true) {
      yield this.i += 1;
    }
  }
}

console.log(a);
for (let p of obj) {
  console.log(p)
}

// const iter = gen();

// const r1 = iter.next()
// const r2 = iter.next()
// iter.next()

// function best(a, b) {

// }

var a = 1;

let b = 11;


// var fn = function () {
//   console.log(1);
// }


// // let
// // const 