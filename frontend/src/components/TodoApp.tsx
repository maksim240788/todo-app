import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTodoStore } from '../store';

function App() {
  const [newTodo, setNewTodo] = useState('');
  const { todos, fetchTodos, addTodo, toggleTodo, deleteTodo } = useTodoStore();

  useEffect(() => { fetchTodos(); }, []);

  return (
    <div className="min-h-screen min-w-screen bg-black text-white px-4 py-10">
      {/* Centered Title */}
      <h1 className="text-4xl font-bold text-center mb-8">TODO LIST</h1>

      {/* Input + Button - Full Width */}
      <div className="flex flex-col sm:flex-row gap-2 mb-6 mx-[30%]">
        <Input
          type="text"
          className="flex-1 px-4 py-3 bg-gray-900 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button
          onClick={() => { addTodo(newTodo); setNewTodo(''); }}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded border border-blue-400 text-black"
        >
          Add
        </Button>
      </div>

      {/* Full-Width TODO List */}
      <ul className="space-y-3 mx-[25%]">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center p-4 bg-gray-800 rounded border border-gray-600"
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              className={`cursor-pointer ${todo.completed ? 'line-through text-gray-400' : ''}`}
            >
              {todo.title}
            </span>
            <Button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
