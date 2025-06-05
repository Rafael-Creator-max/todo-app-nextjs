'use client';

import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

interface TodoRemoveButtonProps {
  onRemove: (e?: React.MouseEvent) => void;
}

export function TodoRemoveButton({ onRemove }: TodoRemoveButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
      onClick={(e) => {
        e.preventDefault();
        onRemove(e);
      }}
      disabled={pending}
    >
      <Trash2 className="h-4 w-4" />
      <span className="sr-only">Remove todo</span>
    </Button>
  );
}
