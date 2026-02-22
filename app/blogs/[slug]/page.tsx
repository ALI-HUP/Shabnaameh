import Header from '@/components/Header'
import type { PortableTextBlock } from '@portabletext/types'
import Link from 'next/link'
import { sanityClient } from '@/lib/sanity.client'
import { singlePostQuery } from '@/lib/sanity.queries'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import CopyLinkButton from '@/components/CopyLinkButton'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: { slug: string }
}

type Post = {
  _id: string
  title: string
  body: PortableTextBlock[]
  nickname?: string
  publishedAt?: string
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post: Post | null = await sanityClient.fetch(
    singlePostQuery,
    { slug: params.slug },
    { cache: 'no-store' }
  )

  if (!post) return { title: 'شب‌نامه یافت نشد' }

  return { title: post.title }
}

export default async function PostPage({ params }: PageProps) {
  if (!params.slug) return notFound()

  const post: Post | null = await sanityClient.fetch(
    singlePostQuery,
    { slug: params.slug },
    { cache: 'no-store' }
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

      <article className="relative mx-auto max-w-3xl px-5 sm:px-6 md:px-8 py-20 sm:py-24 md:py-28 space-y-16 bg-gray-900/55 backdrop-blur-md rounded-xl border border-gray-800/40">

        <header className="space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-relaxed tracking-tight text-stone-50">
            {post.title}
          </h1>

          {post.nickname && (
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs text-stone-400 tracking-wider">
                نوشته شده توسط
              </span>
              <span className="px-3 py-1 text-sm bg-rose-700/20 border border-rose-700/40 text-rose-400 rounded-full">
                {post.nickname}
              </span>
            </div>
          )}

          {post.publishedAt && (
            <div className="mt-3 inline-flex items-center px-3 py-1 text-xs bg-stone-700/30 border border-stone-600/40 text-stone-300 rounded-full">
              {new Date(post.publishedAt).toLocaleDateString('fa-IR')}
            </div>
          )}
        </header>

        <div className="border-t border-gray-700/50" />

        <div className="prose prose-invert max-w-none prose-p:leading-9 prose-headings:mt-10 prose-headings:mb-6 prose-strong:text-rose-400 text-base sm:text-lg">
          <PortableText value={post.body} />
        </div>

        <div className="pt-10 flex items-center justify-between">
          <CopyLinkButton />
          <Link
            href="/blogs"
            className="inline-flex items-center px-4 py-1.5 text-sm bg-rose-700/20 border border-rose-700/40 text-rose-400 rounded-full transition-all hover:bg-rose-700/30 hover:border-rose-500"
          >
            پایان شب‌نامه
          </Link>
        </div>
      </article>
    </main>
  )
}
