'use client'

import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import Header from '@/components/Header'
import { createPost } from "../actions/createPost";

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-rose-700 hover:bg-rose-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all shadow-sm hover:shadow-md text-base"
    >
      {pending ? 'در حال انتشار...' : 'انتشار'}
    </button>
  )
}

export default function WritePage() {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [state, formAction] = useFormState(createPost, { error: "" })

  const minBody = 10
  const maxBody = 30000

  return (
    <main
      dir="rtl"
      className="relative py-20 md:py-24 p-3 sm:p-5 md:p-7 min-h-screen bg-black text-stone-100 overflow-hidden"
      style={{
        backgroundImage: "url('/background/photo_2026-02-09_22-46-50.jpg')",
        backgroundSize: "cover",
      }}
    >
      <Header />

      <div className="pointer-events-none absolute inset-0 bg-black/65" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/30" />

      <section className="relative mx-auto max-w-4xl px-5 sm:px-6 md:px-7 pt-12 sm:pt-16 md:pt-20 pb-5 sm:pb-6 md:pb-7 space-y-12 sm:space-y-16 bg-gray-900/55 backdrop-blur-md rounded-xl border border-gray-800/40">

        <header className="space-y-6 text-center md:text-right">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-stone-50">
            نوشتن شب‌نامه
          </h1>
        </header>

        <div className="border-t border-gray-700/50 w-full" />

        <form action={formAction} className="space-y-8 sm:space-y-10">

          {state?.error && (
            <div className="text-rose-500 text-sm font-medium">
              {state.error}
            </div>
          )}

          <section className="space-y-3">
            <label htmlFor="title" className="block text-lg sm:text-xl font-medium text-stone-200">
              عنوان
            </label>

            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                required
                maxLength={20}
                dir="rtl"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 sm:px-5 py-3.5 pl-16 bg-gray-800/65 border border-gray-700 rounded-lg text-base sm:text-lg text-stone-50"
              />
              <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm ${title.length === 20 ? "text-rose-500 font-medium" : "text-stone-400"}`}>
                {title.length}/20
              </span>
            </div>
          </section>

          <section className="space-y-3">
            <label htmlFor="body" className="block text-lg sm:text-xl font-medium text-stone-200">
              متن شب‌نامه
            </label>

            <div className="relative">
              <textarea
                id="body"
                name="body"
                required
                rows={15}
                dir="rtl"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full px-4 sm:px-5 py-4 bg-gray-800/65 border border-gray-700 rounded-lg text-base sm:text-lg text-stone-50 resize-y"
              />
              <span
                className={`absolute left-4 bottom-4 text-sm ${
                  body.length < minBody || body.length > maxBody
                    ? "text-rose-500 font-medium"
                    : "text-stone-400"
                }`}
              >
                {body.length}/{maxBody}
              </span>
            </div>
          </section>

          <footer className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="text-sm text-stone-400 leading-relaxed max-w-md space-y-2">
              <p>
                پس از انتشار، نوشته مستقیماً وارد آرشیو شب‌نامه
                می‌شود و قابل ویرایش یا حذف نخواهد بود.
              </p>
              <p className="text-stone-400">
                انتشار ممکن است چند دقیقه زمان ببرد.
              </p>
            </div>

            <SubmitButton />
          </footer>
        </form>
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
  );
}
