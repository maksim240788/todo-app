import { create } from 'zustand';

export type Todo = { id: number; title: string; completed: boolean; };

type Store = {
  todos: Todo[];
  fetchTodos: () => void;
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

export const useTodoStore = create<Store>((set, get) => ({
  todos: [],
  fetchTodos: async () => {
    const res = await fetch('http://localhost:3001/todos');
    set({ todos: await res.json() });
  },
  addTodo: async (title) => {
    const res = await fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    get().fetchTodos();
  },
  toggleTodo: async (id) => {
    const todo = get().todos.find(t => t.id === id);
    await fetch(`http://localhost:3001/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo?.completed }),
    });
    get().fetchTodos();
  },
  deleteTodo: async (id) => {
    await fetch(`http://localhost:3001/todos/${id}`, { method: 'DELETE' });
    get().fetchTodos();
  }
}));
