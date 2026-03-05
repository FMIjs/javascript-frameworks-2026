Class `Task`
 - `run(cb)`
  - params: `cb` - function to execute
  - schedules the function as a macro task and executes it

Class `HighPriorityTask`
 - Extends `Task`
 - `run(cb)`
  - params: `cb` - function to execute
  - schedules the function as a micro task and executes it

Class `Scheduler`
 - holds lists of current micro and macro tasks
 - `addMicroTask(cb)`
 - `addMacroTask(cb)`
 - `runAll()`