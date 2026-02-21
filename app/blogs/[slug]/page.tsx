import Header from '@/components/Header'
import type { PortableTextBlock } from '@portabletext/types'
import Link from 'next/link'
import { sanityClient } from '@/lib/sanity.client'
import { singlePostQuery } from '@/lib/sanity.queries'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const revalidate = 60

type PageProps = {
  params: {
    slug: string
  }
}

type Post = {
  _id: string
  title: string
  body: PortableTextBlock[]
  publishedAt?: string
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const post: Post | null = await sanityClient.fetch(
    singlePostQuery,
    { slug: params.slug }
  )

  if (!post) {
    return { title: 'شب‌نامه یافت نشد' }
  }

  return {
    title: post.title,
  }
}

export default async function PostPage({ params }: PageProps) {
  if (!params.slug) return notFound()

  const post: Post | null = await sanityClient.fetch(
    singlePostQuery,
    { slug: params.slug }
  )

  if (!post) return notFound()

  return (
    <main
      dir="rtl"
      className="relative py-20 md:py-24 p-3 sm:p-5 md:p-7 min-h-screen bg-black text-stone-100 overflow-hidden"
      style={{
        backgroundImage: "url('/background/photo_2026-02-09_22-46-50.jpg')",
        backgroundSize: 'cover',
      }}
    >
      <Header />

      <div className="pointer-events-none absolute inset-0 bg-black/65" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/30" />

      <article className="relative mx-auto max-w-3xl px-5 sm:px-6 md:px-8 py-20 sm:py-24 md:py-28 space-y-20 bg-gray-900/55 backdrop-blur-md rounded-xl border border-gray-800/40">

        <header className="space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-relaxed tracking-tight text-stone-50">
            {post.title}
          </h1>

          {post.publishedAt && (
            <span className="block text-sm text-stone-400">
              {new Date(post.publishedAt).toLocaleDateString('fa-IR')}
            </span>
          )}
        </header>

        <div className="border-t border-gray-700/50" />

        <div>
          {post.body && <PortableText value={post.body} />}
        </div>

        <div className="pt-14 text-left">
          <Link
            href="/blogs"
            className="inline text-sm text-stone-400 transition-all duration-300 hover:text-white hover:[text-shadow:0_0_8px_rgba(244,63,94,0.9),0_0_18px_rgba(244,63,94,0.8),0_0_28px_rgba(244,63,94,0.6)]"
          >
            پایان شب‌نامه
          </Link>
        </div>

      </article>
    </main>
  )
}