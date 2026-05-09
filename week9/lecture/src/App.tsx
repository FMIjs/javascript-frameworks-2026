import { useState } from "react";
import "./App.css";
import { TodoMachineContext } from "./machines/TodoMachineContext";
import type { FilterMode } from "./machines/todoMachine";

function App() {
  const [draft, setDraft] = useState("");
  const todos = TodoMachineContext.useSelector((state) => state.context.todos);
  const error = TodoMachineContext.useSelector((state) => state.context.error);
  const isLoading = TodoMachineContext.useSelector((state) =>
    state.matches("loading"),
  );
  const isError = TodoMachineContext.useSelector((state) =>
    state.matches("error"),
  );
  const isReady = TodoMachineContext.useSelector((state) =>
    state.matches("ready"),
  );
  const isEditing = TodoMachineContext.useSelector((state) =>
    state.matches({ ready: { form: "editing" } }),
  );
  const filter = TodoMachineContext.useSelector<FilterMode>((state) =>
    state.matches({ ready: { filter: "active" } })
      ? "active"
      : state.matches({ ready: { filter: "completed" } })
        ? "completed"
        : "all",
  );
  const actor = TodoMachineContext.useActorRef();

  const submit = () => {
    const text = draft.trim();
    if (!text) return;
    actor.send({ type: "todo.add", text });
    setDraft("");
  };

  const cancel = () => {
    setDraft("");
    actor.send({ type: "form.hide" });
  };

  const visibleTodos =
    filter === "active"
      ? todos.filter((todo) => !todo.completed)
      : filter === "completed"
        ? todos.filter((todo) => todo.completed)
        : todos;

  const remaining = todos.filter((todo) => !todo.completed).length;

  return (
    <main className="todo-app">
      <h1>Todos</h1>

      {isLoading && <p className="todo-empty">Loading todos…</p>}

      {isError && (
        <div className="todo-error">
          <p>Couldn't load todos{error ? `: ${error}` : ""}.</p>
          <button
            type="button"
            className="todo-toggle"
            onClick={() => actor.send({ type: "retry" })}
          >
            Retry
          </button>
        </div>
      )}

      {isReady && (
        <>
          {isEditing ? (
            <form
              className="todo-form"
              onSubmit={(event) => {
                event.preventDefault();
                submit();
              }}
            >
              <input
                className="todo-input"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="What needs to be done?"
                autoFocus
              />
              <button type="submit" className="todo-add">
                Add
              </button>
              <button type="button" className="todo-cancel" onClick={cancel}>
                Cancel
              </button>
            </form>
          ) : (
            <button
              type="button"
              className="todo-toggle"
              onClick={() => actor.send({ type: "form.show" })}
            >
              + New todo
            </button>
          )}

          <nav className="todo-filters" aria-label="Filter todos">
            <button
              type="button"
              className={`todo-filter${filter === "all" ? " active" : ""}`}
              onClick={() => actor.send({ type: "filter.all" })}
            >
              All
            </button>
            <button
              type="button"
              className={`todo-filter${filter === "active" ? " active" : ""}`}
              onClick={() => actor.send({ type: "filter.active" })}
            >
              Active
            </button>
            <button
              type="button"
              className={`todo-filter${filter === "completed" ? " active" : ""}`}
              onClick={() => actor.send({ type: "filter.completed" })}
            >
              Completed
            </button>
          </nav>

          {todos.length === 0 ? (
            <p className="todo-empty">No todos yet — add one above.</p>
          ) : visibleTodos.length === 0 ? (
            <p className="todo-empty">No todos match this filter.</p>
          ) : (
            <ul className="todo-list">
              {visibleTodos.map((todo) => (
                <li
                  key={todo.id}
                  className={`todo-item${todo.completed ? " done" : ""}`}
                >
                  <label className="todo-label">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() =>
                        actor.send({ type: "todo.toggle", id: todo.id })
                      }
                    />
                    <span>{todo.text}</span>
                  </label>
                  <button
                    type="button"
                    className="todo-remove"
                    aria-label="Remove todo"
                    onClick={() =>
                      actor.send({ type: "todo.remove", id: todo.id })
                    }
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}

          <footer className="todo-footer">
            {remaining} remaining of {todos.length}
          </footer>
        </>
      )}
    </main>
  );
}

export default App;
