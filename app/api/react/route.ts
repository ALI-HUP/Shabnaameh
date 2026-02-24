import { NextResponse } from 'next/server'
import { sanityWriteClient } from '@/lib/sanity.write'

export async function POST(req: Request) {
  try {
    const { id, type } = await req.json()

    if (!id || !['like', 'dislike'].includes(type)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    await sanityWriteClient
      .patch(id)
      .setIfMissing({ likes: 0, dislikes: 0 })
      .inc(type === 'like' ? { likes: 1 } : { dislikes: 1 })
      .commit()

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}