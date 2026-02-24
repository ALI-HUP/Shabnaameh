import Header from '@/components/Header';
import type { PortableTextBlock } from '@portabletext/types';
import Link from 'next/link';
import { sanityClient } from '@/lib/sanity.client';
import { singlePostQuery } from '@/lib/sanity.queries';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CopyLinkButton from '@/components/CopyLinkButton';
import { sanityWriteClient } from '@/lib/sanity.write';
import {
  ThumbUpAltOutlined as ThumbUpAltOutlinedIcon,
  ThumbDownAltOutlined as ThumbDownAltOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
} from '@mui/icons-material';



export const dynamic = 'force-dynamic'

type PageProps = {
  params: { slug: string }
}

type Post = {
  _id: string
  title: string
  body: PortableTextBlock[]
  publishedAt?: string
  nickname?: string
  likes?: number
  dislikes?: number
  views?: number
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

  await sanityWriteClient
    .patch(post._id)
    .setIfMissing({ views: 0 })
    .inc({ views: 1 })
    .commit()

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

          <div className="flex flex-wrap items-center gap-3 mt-3">
            {post.nickname && (
              <span className="px-3 py-1 text-sm bg-rose-700/20 border border-rose-700/40 text-rose-400 rounded-full">
                نوشته شده توسط: {post.nickname}
              </span>
            )}

            {post.publishedAt && (
              <span className="px-3 py-1 text-xs bg-stone-700/30 border border-stone-600/40 text-stone-300 rounded-full">
                {new Date(post.publishedAt).toLocaleDateString('fa-IR')}
              </span>
            )}
          </div>
        </header>

        <div className="border-t border-gray-700/50" />

        <div className="prose prose-invert max-w-none prose-p:leading-9 prose-headings:mt-10 prose-headings:mb-6 prose-strong:text-rose-400 text-base sm:text-lg">
          <PortableText value={post.body} />
        </div>

        <div className="pt-8">
          <div className="flex items-center justify-between bg-gray-800/60 border border-rose-700/40 rounded-xl px-6 py-4 backdrop-blur-sm">

            <button className="flex items-center gap-2 text-stone-300 hover:text-rose-400 transition-all">
              <ThumbUpAltOutlinedIcon fontSize="small" />
              <span className="text-sm font-medium">
                {post.likes ?? 0}
              </span>
            </button>

            <button className="flex items-center gap-2 text-stone-300 hover:text-rose-400 transition-all">
              <ThumbDownAltOutlinedIcon fontSize="small" />
              <span className="text-sm font-medium">
                {post.dislikes ?? 0}
              </span>
            </button>

            <div className="flex items-center gap-2 text-stone-400">
              <VisibilityOutlinedIcon fontSize="small" />
              <span className="text-sm font-medium">
                {(post.views ?? 0) + 1}
              </span>
            </div>

          </div>
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
