import { createPost } from '../actions/createPost'

export default function WritePage() {
  return (
    <main
      dir="rtl"
      className="relative min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden"
    >
      {/* ambient color – same system */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 right-1/3 w-125 h-125 rounded-full bg-indigo-500/20 blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-100 h-100 rounded-full bg-fuchsia-500/15 blur-[120px]" />
      </div>

      <section className="relative mx-auto max-w-3xl px-6 py-32 space-y-20">

        {/* Header */}
        <header className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            نوشتن شبنامه
          </h1>

          <p className="text-zinc-300 leading-relaxed">
            این نوشته قرار نیست فریاد باشد.  
            قرار است بماند.
          </p>
        </header>

        {/* Divider */}
        <div className="h-0.5 w-full bg-linear-to-l from-transparent via-indigo-400/80 to-transparent" />

        {/* Form */}
        <form
          action={createPost}
          className="relative space-y-16 pr-6"
        >
          {/* margin line – paper feeling */}
          <div className="absolute right-0 top-0 bottom-0 w-px bg-white/10" />

          {/* Title */}
          <section className="space-y-4">
            <label className="text-sm text-zinc-400">
              عنوان
            </label>

            <input
              name="title"
              required
              placeholder="عنوان شبنامه…"
              className="w-full bg-transparent border-none outline-none text-2xl font-medium text-white placeholder:text-zinc-600 focus:ring-0"
            />
          </section>

          {/* Body */}
          <section className="space-y-4">
            <label className="text-sm text-zinc-400">
              متن
            </label>

            <textarea
              name="body"
              required
              rows={14}
              placeholder="شروع کن به نوشتن…"
              className="w-full resize-none bg-transparent border-none outline-none text-zinc-200 leading-loose placeholder:text-zinc-600 focus:ring-0"
            />
          </section>

          {/* Footer */}
          <footer className="pt-12 flex items-center justify-between">
            <span className="text-xs text-zinc-500">
              پس از انتشار، شبنامه فوراً وارد آرشیو می‌شود
            </span>

            <button
              type="submit"
              className="relative inline-flex items-center gap-3 text-sm text-white px-6 py-2 border border-white/20 rounded-full hover:border-indigo-400 transition"
            >
              <span>انتشار</span>
              <span className="text-indigo-400">
                ←
              </span>
            </button>
          </footer>
        </form>

      </section>
    </main>
  )
}
