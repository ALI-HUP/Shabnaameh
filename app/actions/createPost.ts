'use server'

import { sanityWriteClient } from '@/lib/sanity.write'
import { redirect } from 'next/navigation'

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .slice(0, 50)
}

function makeKey(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 6)}`
}

export async function createPost(_: any, formData: FormData) {
  const rawTitle = formData.get('title')
  const rawBody = formData.get('body')

  if (!rawTitle || !rawBody) {
    return { error: 'همه فیلدها الزامی هستند.' }
  }

  const title = rawTitle.toString().trim()
  const body = rawBody.toString().trim()

  if (title.length < 3)
    return { error: 'عنوان باید حداقل ۳ کاراکتر باشد.' }

  if (title.length > 20)
    return { error: 'عنوان نمی‌تواند بیشتر از ۲۰ کاراکتر باشد.' }

  if (body.length < 10)
    return { error: 'متن باید حداقل ۱۰ کاراکتر باشد.' }

  if (body.length > 5000)
    return { error: 'متن بیش از حد طولانی است.' }

  const blocks = body
    .split('\n')
    .filter(p => p.trim() !== '')
    .map((paragraph) => ({
      _key: makeKey('block'),
      _type: 'block',
      children: [
        {
          _key: makeKey('span'),
          _type: 'span',
          text: paragraph,
        },
      ],
    }))

  const slug = `${slugify(title)}-${Date.now().toString(36)}`

  await sanityWriteClient.create({
    _type: 'post',
    title,
    slug: { current: slug },
    body: blocks,
    publishedAt: new Date().toISOString(),
  })

  redirect('/blogs')
}
