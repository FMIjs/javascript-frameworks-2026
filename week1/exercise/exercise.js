function Task(name) {
  // -> Constructor function
  this.name = name;

  this.runI = function() {
    console.log(`runI ${this.name}`);
  };
  this.runIArrow = () => {
    console.log(`runI ${this.name}`);
  };
}

Task.prototype.run = function() {
  console.log(`run ${this.name}`);
};
// t1.run() --> "run "

Task.prototype.run2 = function() {
  console.log(`run2 ${this.name}`);
};

// const t1 = new Task('test1');
// const t2 = new Task('test2');

// console.log(t1); // Task {name: 'test1', runI: ƒ}
// console.log(t2); // Task {name: 'test2', runI: ƒ}
// console.log(t1.runI === t2.runI); // false
// console.log(t1.run === t2.run); // true


function HighPriorityTask(name, priority) {
  Task.call(this, name);
  this.priority = priority;
}

HighPriorityTask.prototype = Object.create(Task.prototype);
HighPriorityTask.prototype.constructor = HighPriorityTask;
HighPriorityTask.prototype.priorityRun = () => {
  console.log(`priorityRun ${this.name} with priority ${this.priority}`);
}


const loggingMixin = {
  log() {
    console.log(this.name)
  }
}


Object.assign(Task.prototype, loggingMixin);
