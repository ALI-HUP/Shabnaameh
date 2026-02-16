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
  const rawTitle = formData.get('title')
  const rawBody = formData.get('body')

  if (!rawTitle || !rawBody) {
    throw new Error('Missing fields')
  }

  const title = rawTitle.toString().trim()
  const body = rawBody.toString().trim()

  if (title.length > 20) {
    throw new Error('Title cannot be longer than 20 characters')
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

  redirect('/blogs')
}
