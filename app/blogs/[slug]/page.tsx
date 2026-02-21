import Header from '@/components/Header'
import Link from 'next/link'
import { sanityClient } from '@/lib/sanity.client'
import { singlePostQuery } from '@/lib/sanity.queries'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: {
    slug: string
  }
}

export default async function PostPage({ params }: PageProps) {
  const post = await sanityClient.fetch(singlePostQuery, {
    slug: params.slug,
  })

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
            <PortableText value={post.body} />
          </div>

          <Link href={"/blogs"}>
            <footer className="pt-14 text-sm text-stone-400 text-left hover:text-white hover:drop-shadow-red-700">
              پایان شب‌نامه
            </footer>
          </Link>

      </article>
    </main>
  )
}
