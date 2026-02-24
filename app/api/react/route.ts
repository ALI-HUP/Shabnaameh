import { NextResponse } from 'next/server'
import { sanityWriteClient } from '@/lib/sanity.write'
import crypto from 'crypto'

function hashIdentity(ip: string, ua: string) {
  return crypto
    .createHash('sha256')
    .update(ip + ua)
    .digest('hex')
}

export async function POST(req: Request) {
  try {
    const { id, type } = await req.json()
    if (!id || !['like', 'dislike'].includes(type))
      return NextResponse.json({ error: 'Invalid' }, { status: 400 })

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    const ua = req.headers.get('user-agent') || 'unknown'

    const hash = hashIdentity(ip, ua)

    const post = await sanityWriteClient.fetch(
      `*[_type == "post" && _id == $id][0]{
        likes,
        dislikes,
        reactedHashes
      }`,
      { id }
    )

    const reacted = post?.reactedHashes || []

    let update: any = {
      setIfMissing: { likes: 0, dislikes: 0, reactedHashes: [] },
    }

    if (!reacted.includes(hash)) {
      update.inc = type === 'like'
        ? { likes: 1 }
        : { dislikes: 1 }

      update.insert = {
        after: 'reactedHashes[-1]',
        items: [hash],
      }
    } else {
      // تغییر رأی
      update.inc =
        type === 'like'
          ? { likes: 1, dislikes: -1 }
          : { dislikes: 1, likes: -1 }
    }

    await sanityWriteClient.patch(id).commit(update)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}