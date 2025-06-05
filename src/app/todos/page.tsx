"use client";

import { useState, useEffect, useCallback } from "react"; // import useCallback
import { Todo } from "@/types";
import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";
import { handleToggle } from "../../actions";

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  //  Memoized fetchTodos used inside initial useEffect and when a todo is added
  const fetchTodos = useCallback(async () => {
    try {
      const response = await fetch("/api/todos");
      const data = await response.json();
      console.log("Fetched todos:", data);
      console.log("Todos data type:", typeof data);
      console.log("Is array:", Array.isArray(data));
      console.log("Todos data:", JSON.stringify(data, null, 2));
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  }, []);

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Handle toggle todo
  const handleToggleTodo = async (id: string, checked: boolean) => {
    await handleToggle(id, checked);
    await fetchTodos();
  };

  // Handle remove todo with force parameter for Unsplash images
  const handleRemoveTodo = async (id: string, hasImage: boolean = false) => {
    try {
      let url = `/api/todos/${id}`;
      if (hasImage) {
        url += "?force=true";
      }

      const response = await fetch(url, { method: "DELETE" });
      const data = await response.json();

      if (!response.ok) {
        if (data.hasImage) {
          const shouldDelete = window.confirm(
            "This todo has an image. Are you sure you want to delete it?\n\n" +
              "Note: The image will be permanently removed."
          );

          if (shouldDelete) {
            await fetch(`/api/todos/${id}?force=true`, { method: "DELETE" });
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
          }
          return;
        }

        throw new Error(data.error || "Failed to delete todo");
      }

      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert(error instanceof Error ? error.message : "Failed to delete todo");
    }
  };

  //  Memoized to prevent infinite loop via useEffect in child
  const handleTodoAdded = useCallback(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Todo App</h1>
          <p className="text-gray-600">
            A simple todo application with Next.js and MySQL
          </p>
        </div>

        <TodoForm onAdd={handleTodoAdded} />

        <TodoList
          todos={todos}
          onToggle={handleToggleTodo}
          onRemove={handleRemoveTodo}
        />
      </div>
    </main>
  );
}
