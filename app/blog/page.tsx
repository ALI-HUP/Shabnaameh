import { sanityClient } from '@/lib/sanity.client'
import { allPostsQuery } from '@/lib/sanity.queries'
import Link from 'next/link'

export const revalidate = 60

export default async function BlogPage() {
  const posts = await sanityClient.fetch(allPostsQuery)

  return (
    <main
      dir="rtl"
      className="relative min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 right-1/4 w-125 h-125 rounded-full bg-indigo-500/20 blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-100 h-100 rounded-full bg-fuchsia-500/15 blur-[120px]" />
      </div>

      <section className="relative mx-auto max-w-6xl px-6 py-28 space-y-20">

        <header className="space-y-6 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            شب‌نامه‌ها
          </h1>
          <p className="text-zinc-300 leading-relaxed">
            هر کدام یک صدا.
            هر کدام یک شب.
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any, i: number) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="group relative aspect-square border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl p-6 flex flex-col justify-between hover:border-indigo-400 transition"
            >
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-l from-transparent via-indigo-400/80 to-transparent opacity-0 group-hover:opacity-100 transition" />

              <span className="text-xs text-zinc-500">
                #{String(i + 1).padStart(2, '0')}
              </span>

              <h2 className="text-lg leading-relaxed font-medium text-zinc-100 group-hover:text-white transition">
                {post.title}
              </h2>

              {post.publishedAt && (
                <span className="text-xs text-zinc-500">
                  {new Date(post.publishedAt).toLocaleDateString('fa-IR')}
                </span>
              )}
            </Link>
          ))}
        </section>

      </section>
    </main>
  )
}
