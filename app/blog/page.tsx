import { sanityClient } from '@/lib/sanity.client'
import { allPostsQuery } from '@/lib/sanity.queries'
import Link from 'next/link'

export const revalidate = 60

export default async function BlogPage() {
  const posts = await sanityClient.fetch(allPostsQuery)

  return (
    <main>
      <h1>Blog</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post._id}>
            <Link href={`/blog/${post.slug.current}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
