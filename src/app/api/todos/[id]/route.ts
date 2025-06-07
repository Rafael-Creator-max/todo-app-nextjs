import { NextResponse, NextRequest } from 'next/server';
import { remove, getById } from '@/queries';

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { searchParams } = new URL(request.url);
    const force = searchParams.get('force') === 'true';

    const id = params.id;

    const todo = await getById(id);
    if (!todo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    if (todo.image && !force) {
      return NextResponse.json(
        {
          error: 'This todo has an image. Add ?force=true to delete it.',
          hasImage: true,
        },
        { status: 400 }
      );
    }

    await remove(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}
