import { sanityClient } from '@/lib/sanity.client'
import { singlePostQuery } from '@/lib/sanity.queries'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic' // 🔴 THIS IS THE KEY

type PageProps = {
  params: {
    slug: string
  }
}

export default async function PostPage({ params }: PageProps) {
  if (!params?.slug) {
    return notFound()
  }

  const post = await sanityClient.fetch(singlePostQuery, {
    slug: params.slug,
  })

  if (!post) {
    return notFound()
  }

  return (
    <article>
      <h1>{post.title}</h1>
      {post.publishedAt && (
        <p>{new Date(post.publishedAt).toLocaleDateString('fa-IR')}</p>
      )}
    </article>
  )
}
