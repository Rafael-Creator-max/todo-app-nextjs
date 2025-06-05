import { query, execute } from "./mysql-connect";
import { Todo } from "./types";

export async function getAll(): Promise<Todo[]> {
  try {
    const results = await query("SELECT * FROM todos ORDER BY created_at DESC");
    return Array.isArray(results) ? (results as Todo[]) : [];
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
}

export async function getById(id: string): Promise<Todo | null> {
  try {
    const results = await query("SELECT * FROM todos WHERE id = ?", [id]);
    return Array.isArray(results) && results.length > 0
      ? (results[0] as Todo)
      : null;
  } catch (error) {
    console.error("Error fetching todo:", error);
    throw error;
  }
}

export async function add(title: string): Promise<{ id: string }> {
  try {
    // Get a UUID manually
    const [uuidRow] = await query("SELECT UUID() AS id");
    const uuid = uuidRow.id;

    // Insert the todo with the generated UUID
    await execute("INSERT INTO todos (id, title) VALUES (?, ?)", [uuid, title]);

    return { id: uuid };
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    await execute("DELETE FROM todos WHERE id = ?", [id]);
  } catch (error) {
    console.error("Error removing todo:", error);
    throw error;
  }
}

export async function toggleCheck(id: string, checked: boolean): Promise<void> {
  try {
    await execute("UPDATE todos SET checked = ? WHERE id = ?", [checked, id]);
  } catch (error) {
    console.error("Error toggling todo:", error);
    throw error;
  }
}
