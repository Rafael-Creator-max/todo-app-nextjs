'use client';

import Image from 'next/image';
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

      {/* Right: image (optional) + remove button */}
      {/* <div className="flex items-center gap-4">
        {image && (
          <div className="relative w-12 h-12">
            <Image
              src={`${image}${image.includes('?') ? '&' : '?'}w=50&h=50&fit=cover`}
              alt="Todo"
              fill
              sizes="(max-width: 768px) 50px, 50px"
              className="object-cover rounded"
              priority={false}
            />
          </div>
        )} */}

        <form action={() => onRemove(id, !!image)}>
          <TodoRemoveButton onRemove={() => onRemove(id, !!image)} />
        </form>
    </Card>
  );
}
