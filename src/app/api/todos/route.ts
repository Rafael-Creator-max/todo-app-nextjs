import { NextResponse } from 'next/server';
import { getAll } from '@/queries';

export async function GET() {
  try {
    const todos = await getAll();
    return NextResponse.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}
