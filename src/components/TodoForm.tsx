'use client';

import { useRef, useEffect, useState } from 'react';
import { useActionState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2, Plus } from 'lucide-react';
import { handleAdd } from '@/actions';

interface TodoFormState {
  success: boolean;
  error: string | null;
  id?: string;
}

const initialState: TodoFormState = {
  success: false,
  error: null,
};

interface TodoFormProps {
  onAdd?: () => void;
}

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type="submit" disabled={pending} className="gap-2">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Adding...
        </>
      ) : (
        <>
          <Plus className="h-4 w-4" />
          Add
        </>
      )}
    </Button>
  );
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, setIsPending] = useState(false);
  const [formKey, setFormKey] = useState(0); // key to reset form

  const [state, formAction] = useActionState<TodoFormState, FormData>(
    async (prevState, formData) => {
      setIsPending(true);
      try {
        const result = await handleAdd(prevState, formData);
        return result;
      } finally {
        setIsPending(false);
      }
    },
    initialState
  );

  useEffect(() => {
    if (state.success && onAdd) {
      onAdd();                          // refresh todos
      inputRef.current!.value = '';     // clear input field
      setFormKey(prev => prev + 1);     // reset form state
    }
  }, [state.success, onAdd]);

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form action={formAction} key={formKey}>
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              name="title"
              ref={inputRef}
              placeholder="Add a new task..."
              className={`w-full ${state?.error ? 'border-red-500' : ''}`}
              disabled={isPending}
              required
              maxLength={100}
            />
            {state?.error && (
              <p className="mt-1 text-sm text-red-500">{state.error}</p>
            )}
          </div>
          <SubmitButton pending={isPending} />
        </div>
      </form>
    </div>
  );
}
