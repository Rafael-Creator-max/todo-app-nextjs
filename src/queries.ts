// src/queries.ts
import { supabase } from './supabase-client'
import { Todo } from './types'
import { randomUUID } from 'crypto'

export async function getAll(): Promise<Todo[]> {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching todos:', error)
    throw error
  }

  return data as Todo[]
}

export async function getById(id: string): Promise<Todo | null> {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null // not found
    console.error('Error fetching todo:', error)
    throw error
  }

  return data as Todo
}

export async function add(title: string): Promise<{ id: string }> {
  const id = randomUUID()
  const { error } = await supabase
    .from('todos')
    .insert({ id, title })

  if (error) {
    console.error('Error adding todo:', error)
    throw error
  }

  return { id }
}

export async function remove(id: string): Promise<void> {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error removing todo:', error)
    throw error
  }
}

export async function toggleCheck(id: string, checked: boolean): Promise<void> {
  const { error } = await supabase
    .from('todos')
    .update({ checked })
    .eq('id', id)

  if (error) {
    console.error('Error toggling todo:', error)
    throw error
  }
}
