import { sanityClient } from '@/lib/sanity.client'
import { allPostsQuery } from '@/lib/sanity.queries'
import Header from '@/components/Header'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

type Post = {
  _id: string
  title: string
  slug: { current: string }
  publishedAt?: string
}

export default async function BlogPage() {
  const posts: Post[] = await sanityClient.fetch(allPostsQuery)

  return (
    <main
      dir="rtl"
      className="relative py-20 md:py-24 p-5 sm:p-6 md:p-10 min-h-screen bg-black text-stone-100 overflow-hidden"
      style={{
        backgroundImage: "url('/background/photo_2026-02-09_22-46-50.jpg')",
        backgroundSize: "cover",
      }}
    >
      <Header />

      <div className="pointer-events-none absolute inset-0 bg-black/65" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/30" />

      <section className="relative mx-auto max-w-4xl px-5 sm:px-6 md:px-7 pt-12 sm:pt-16 md:pt-20 pb-5 sm:pb-6 md:pb-7 space-y-12 sm:space-y-16 bg-gray-900/55 backdrop-blur-md rounded-xl border border-gray-800/40">

        <header className="space-y-6 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-stone-50">
            شب‌نامه‌ها
          </h1>

          <p className="text-lg sm:text-xl leading-relaxed text-stone-300">
            هر کدام یک صدا.
            <br />
            هر کدام یک شب.
          </p>
        </header>

        <div className="border-t border-gray-700/50" />

        {posts.length === 0 ? (
          <p className="text-stone-400 text-center">
            هنوز شب‌نامه‌ای منتشر نشده است.
          </p>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {posts.map((post, i) => {
              const number = posts.length - i

              return (
                <Link
                  key={post._id}
                  href={`/blogs/${post.slug.current}`}
                  className="group relative flex flex-col justify-between rounded-xl border border-gray-700/50 bg-gray-800/55 backdrop-blur-sm p-6 transition-all hover:border-rose-600/60 hover:bg-gray-800/70"
                >
                  <span className="text-xs font-medium text-stone-400">
                    شب‌نامه {String(number).padStart(2, '0')}
                  </span>

                  <h2 className="mt-6 text-base sm:text-lg leading-relaxed font-medium text-stone-100 group-hover:text-stone-50 transition-colors">
                    {post.title}
                  </h2>

                  {post.publishedAt && (
                    <span className="mt-6 text-xs text-stone-400">
                      {new Date(post.publishedAt).toLocaleDateString('fa-IR')}
                    </span>
                  )}
                </Link>
              )
            })}
          </section>
        )}
        <div className="text-white flex text-sm items-center text-center justify-center flex-col gap-3 p-5">
          <p>
            برای تجربه بهتر، از لپتاپ استفاده کنید.
          </p>
          <p>
            برای استفاده از سایت نیازی به VPN نیست، ولی برای امنیت بیشتر آن را روشن کنید.
          </p>
        </div>
      </section>
    </main>
  )
}
