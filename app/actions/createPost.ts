'use server'

import { sanityWriteClient } from '@/lib/sanity.write'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

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
  const rawNickname = formData.get('nickname')

  if (!rawTitle || !rawBody) {
    return { error: 'همه فیلدها الزامی هستند.' }
  }

  const title = rawTitle.toString().trim()
  const body = rawBody.toString().trim()
  const nickname = rawNickname?.toString().trim() || ''

  if (title.length < 1)
    return { error: 'عنوان باید حداقل ۱ کاراکتر باشد.' }

  if (title.length > 35)
    return { error: 'عنوان نمی‌تواند بیشتر از ۳۵ کاراکتر باشد.' }

  if (body.length < 10)
    return { error: 'متن باید حداقل ۱۰ کاراکتر باشد.' }

  if (body.length > 50000)
    return { error: 'متن نمی‌تواند بیشتر از ۵۰۰۰۰ کاراکتر باشد.' }

  if (nickname.length > 40)
    return { error: 'لقب نمی‌تواند بیشتر از ۴۰ کاراکتر باشد.' }

  const recentPost = await sanityWriteClient.fetch(
    `*[_type == "post" && title == $title && dateTime(publishedAt) > dateTime(now()) - 10][0]`,
    { title }
  )

  if (recentPost) {
    return { error: 'این نوشته قبلاً ثبت شده است.' }
  }

  const blocks = body.split('\n').map((paragraph) => ({
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
    nickname: nickname || undefined,
    body: blocks,
    publishedAt: new Date().toISOString(),
  })

  revalidatePath('/blogs')
  revalidatePath(`/blogs/${slug}`)

  redirect('/blogs')
}
