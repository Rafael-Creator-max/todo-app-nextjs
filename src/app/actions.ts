'use server';

import { addTodo, removeTodo, toggleTodo } from '@/lib/queries';
import { TodoInput } from '@/lib/types';

const BLACKLISTED_WORDS = ['dirty', 'badword', 'inappropriate'];
const MAX_TASK_LENGTH = 100;

function validateTask(task: string): { valid: boolean; message?: string } {
  if (!task.trim()) {
    return { valid: false, message: 'Field cannot be empty' };
  }

  if (task.length > MAX_TASK_LENGTH) {
    return { 
      valid: false, 
      message: `Please use a maximum of ${MAX_TASK_LENGTH} characters. You used ${task.length}` 
    };
  }

  const hasBlacklistedWord = BLACKLISTED_WORDS.some(word => 
    task.toLowerCase().includes(word)
  );

  if (hasBlacklistedWord) {
    return { valid: false, message: 'Dirty words are not permitted' };
  }

  return { valid: true };
}

export async function handleAdd(prevState: any, formData: FormData) {
  const task = formData.get('task') as string;
  const validation = validateTask(task);
  
  if (!validation.valid) {
    return { success: false, error: validation.message };
  }

  try {
    await addTodo({ task, checked: false });
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: 'Failed to add todo' };
  }
}

export async function handleToggle(id: string, checked: boolean) {
  await toggleTodo(id, checked);
}

export async function handleRemove(id: string) {
  await removeTodo(id);
}
