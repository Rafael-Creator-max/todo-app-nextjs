'use client';

// import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { TodoRemoveButton } from '@/components/TodoRemoveButton';

interface TodoListItemProps {
  id: string;
  task: string;
  checked: boolean;
  image?: string;
  onToggle: (id: string, checked: boolean) => void;
  onRemove: (id: string, hasImage: boolean) => void;
}

export function TodoListItem({
  id,
  task,
  checked,
  image,
  onToggle,
  onRemove,
}: TodoListItemProps) {
  const handleCheckboxChange = (isChecked: boolean | string) => {
    onToggle(id, isChecked as boolean);
  };

  return (
    <Card className="p-4 flex flex-row items-center justify-between gap-4">
      {/* Left: Checkbox and label */}
      <div className="flex items-center gap-3">
        <Checkbox
          id={`todo-${id}`}
          checked={checked}
          onCheckedChange={handleCheckboxChange}
          className="h-5 w-5"
        />
        <label
          htmlFor={`todo-${id}`}
          className={`text-base font-medium ${
            checked ? 'line-through text-gray-500' : 'text-gray-900'
          }`}
        >
          {task}
        </label>
      </div>

      {/* Right: remove button */}
      <form action={() => onRemove(id, !!image)}>
        <TodoRemoveButton onRemove={() => onRemove(id, !!image)} />
      </form>
    </Card>
  );
}
