'use server'

import { sanityWriteClient } from '@/lib/sanity.write'
import { redirect } from 'next/navigation'

function makeSlug() {
  const time = Date.now().toString(36)
  const rand = Math.random().toString(36).slice(2, 6)
  return `${time}-${rand}`
}

function makeKey(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 6)}`
}

export async function createPost(formData: FormData) {
  const title = formData.get('title')?.toString()
  const body = formData.get('body')?.toString()

  if (!title || !body) {
    throw new Error('Missing fields')
  }

  const slug = makeSlug()

  await sanityWriteClient.create({
    _type: 'post',
    title,
    slug: { current: slug },
    body: [
      {
        _key: makeKey('block'),
        _type: 'block',
        children: [
          {
            _key: makeKey('span'),
            _type: 'span',
            text: body,
          },
        ],
      },
    ],
    publishedAt: new Date().toISOString(),
  })

  redirect('/blog')
}
