export type Todo = {
  id: string;
  title: string;
  checked: boolean;
  image?: string;
  created_at?: string;
};

export type TodoInput = Omit<Todo, 'id' | 'created_at'>;

export type ValidationResult = {
  valid: boolean;
  message?: string;
};
