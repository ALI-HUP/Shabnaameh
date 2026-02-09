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
      className="relative min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden"
    >
      {/* ambient color – same language as blog grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-24 right-1/3 w-125 h-125 rounded-full bg-indigo-500/20 blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-100 h-100 rounded-full bg-fuchsia-500/15 blur-[120px]" />
      </div>

      <article className="relative mx-auto max-w-3xl px-6 py-32 space-y-20">

        {/* Header */}
        <header className="space-y-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-relaxed">
            {post.title}
          </h1>

          {post.publishedAt && (
            <span className="text-sm text-zinc-400">
              {new Date(post.publishedAt).toLocaleDateString('fa-IR')}
            </span>
          )}
        </header>

        {/* glowing divider */}
        <div className="h-0.5 w-full bg-linear-to-l from-transparent via-indigo-400/80 to-transparent" />

        {/* Body */}
        <section className="relative leading-loose text-zinc-200 pr-6">
          {/* margin line – paper / note feeling */}
          <div className="absolute right-0 top-0 bottom-0 w-px bg-white/10" />

          <div className="prose prose-invert prose-zinc max-w-none prose-p:leading-loose prose-p:text-zinc-200">
            <PortableText value={post.body} />
          </div>
        </section>

        {/* Footer marker */}
        <footer className="pt-12 flex items-center justify-end text-xs text-zinc-500">
          پایان شبنامه
        </footer>

      </article>
    </main>
  )
}
