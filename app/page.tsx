'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from 'next/link'; // Import Link

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-12 py-16 px-8 bg-white dark:bg-black">
        <header className="flex flex-col items-center gap-4">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={24}
            priority
          />
          <h1 className="text-4xl font-semibold text-black dark:text-zinc-50">
            My Todo App
          </h1>
        </header>

        <section className="w-full">
          <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Add a new todo..."
              className="flex-grow rounded-md border border-zinc-300 dark:border-zinc-700 p-2 text-black dark:text-white bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Add Todo
            </button>
          </form>
        </section>

        <section className="w-full">
          <ul className="space-y-3">
            {todos.length === 0 && (
              <p className="text-center text-zinc-500 dark:text-zinc-400">
                No todos yet! Add some above.
              </p>
            )}
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`flex items-center justify-between rounded-md border border-zinc-200 dark:border-zinc-800 p-3 ${
                  todo.completed ? 'bg-green-50 dark:bg-green-900/20' : 'bg-white dark:bg-zinc-900'
                }`}
              >
                <span
                  onClick={() => handleToggleTodo(todo.id)}
                  className={`cursor-pointer flex-grow ${
                    todo.completed
                      ? 'line-through text-zinc-500 dark:text-zinc-400'
                      : 'text-black dark:text-zinc-50'
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="ml-4 rounded bg-red-500 px-2 py-1 text-xs text-white transition-colors hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="text-center text-zinc-600 dark:text-zinc-300 mt-8">
          <p>
            <Link href="/env" className="text-blue-600 hover:underline dark:text-blue-400">
              View Environment Variables
            </Link>
          </p>
        </section>

        <footer className="text-center text-zinc-500 dark:text-zinc-400 mt-auto">
          <p>Simple Todo App built with Next.js</p>
        </footer>
      </main>
    </div>
  );
} 