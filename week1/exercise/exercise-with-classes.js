class Task {
  constructor(name) {
    this.name = name;
    this.runI = () => {
      console.log(`runI ${this.name}`);
    };
  }

  run() {
    console.log(`run ${this.name}`);
  }
  run2() {
    console.log(`run ${this.name}`);
  }
}

class HighPriorityTask extends Task {
  constructor(name, priority) {
    super(name);
    this.priority = priority;
  }
  priorityRun() {
    console.log(`priorityRun ${this.name} with priority ${this.priority}`);
  }
}
