function Animal (name) {
  this.name = name
}

Animal.prototype.eat = function () {
  console.log(this.name + ' is eating')
}


// "Vertical" inheritance
function Dog (name) {
  Animal.call(this, name)
}

Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog

Dog.prototype.bark = function () {
  console.log(this.name + ' is barking')
}

// "Horizontal" inheritance (mixins)

const flight = {
  fly() {
    console.log(this.name + ' is flying')
  }
}

function Bird (name) {
  this.name = name;
}

// Animal + flight
// Bird + flight

Object.assign(Animal.prototype, flight)
//...
Object.assign(Bird.prototype, flight)

const dog = new Dog('Rex')
const bird = new Bird('Tweety')

dog.fly()
bird.fly()