'use client';

import { Todo } from '@/types';
import { TodoListItem } from './TodoListItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string, checked: boolean) => void;
  onRemove: (id: string, hasImage: boolean) => void;
}

export function TodoList({ todos, onToggle, onRemove }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No todos yet. Add one above!
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          id={todo.id}
          task={todo.title}
          checked={todo.checked}
          image={todo.image}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
