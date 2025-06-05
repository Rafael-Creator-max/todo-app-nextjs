'use server';

import { add, remove, toggleCheck } from '@/queries';

// Define a proper state type instead of using `any`
interface TodoFormState {
  success: boolean;
  error: string | null;
  id?: string;
}

const BLACKLISTED_WORDS = ['dirty', 'badword', 'inappropriate'];
const MAX_TITLE_LENGTH = 100;

function validateTask(title: string): { valid: boolean; message?: string } {
  if (!title.trim()) {
    return { valid: false, message: 'Field cannot be empty' };
  }

  if (title.length > MAX_TITLE_LENGTH) {
    return {
      valid: false,
      message: `Please use a maximum of ${MAX_TITLE_LENGTH} characters. You used ${title.length}`,
    };
  }

  const hasBlacklistedWord = BLACKLISTED_WORDS.some((word) =>
    title.toLowerCase().includes(word)
  );

  if (hasBlacklistedWord) {
    return { valid: false, message: 'Dirty words are not permitted' };
  }

  return { valid: true };
}

export async function handleAdd(
  prevState: TodoFormState,
  formData: FormData
): Promise<TodoFormState> {
  const title = formData.get('title') as string;
  const validation = validateTask(title);

  if (!validation.valid) {
    return {
      ...prevState,
      success: false,
      error: validation.message || 'Validation failed',
    };
  }

  try {
    const result = await add(title); // assuming add() returns { id: string }
    return { success: true, error: null, id: result.id };
  } catch (err) {
    console.error('Failed to add todo:', err);
    return { ...prevState, success: false, error: 'Failed to add todo' };
  }
}

export async function handleToggle(
  id: string,
  checked: boolean
): Promise<void> {
  await toggleCheck(id, checked);
}

export async function handleRemove(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await remove(id);
    return { success: true };
  } catch (err) {
    console.error('Failed to remove todo:', err);
    return { success: false, error: 'Failed to remove todo' };
  }
}
