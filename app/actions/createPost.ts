'use server'

import { sanityWriteClient } from '@/lib/sanity.write'
import { redirect } from 'next/navigation'

function makeSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u0600-\u06FF\s-]/g, '')
    .replace(/\s+/g, '-')
}

export async function createPost(formData: FormData) {
  const title = formData.get('title')?.toString()
  const body = formData.get('body')?.toString()

  if (!title || !body) {
    throw new Error('Missing fields')
  }

  const slug = makeSlug(title)

  await sanityWriteClient.create({
    _type: 'post',
    title,
    slug: { current: slug },
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: body }],
      },
    ],
    publishedAt: new Date().toISOString(),
  })

  redirect('/blog')
}
