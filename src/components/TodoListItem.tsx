'use client';

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

export function TodoListItem({ id, task, checked, image, onToggle, onRemove }: TodoListItemProps) {
  const handleCheckboxChange = (isChecked: boolean | string) => {
    onToggle(id, isChecked as boolean);
  };

  return (
    <Card className="p-4 mb-2 flex items-center justify-between">
      <div className="flex items-center space-x-4 flex-1">
        <Checkbox 
          id={`todo-${id}`} 
          checked={checked}
          onCheckedChange={handleCheckboxChange}
          className="h-5 w-5 rounded"
        />
        <label 
          htmlFor={`todo-${id}`} 
          className={`text-sm font-medium leading-none ${checked ? 'line-through text-gray-500' : 'text-gray-900'}`}
        >
          {task}
        </label>
      </div>
      
      <form action={() => onRemove(id, !!image)}>
        <TodoRemoveButton onRemove={() => onRemove(id, !!image)} />
      </form>
      
      {image && (
        <div className="ml-4">
          <img 
            src={`${image}${image.includes('?') ? '&' : '?'}w=50&h=50&fit=cover`} 
            alt="Todo" 
            className="w-12 h-12 object-cover rounded"
          />
        </div>
      )}
    </Card>
  );
}
