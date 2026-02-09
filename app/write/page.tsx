import { createPost } from '../actions/createPost'

export default function WritePage() {
  return (
    <main
      dir="rtl"
      className="relative min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-zinc-100 flex items-center justify-center px-4"
    >
      {/* ambient gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-[360px] h-[360px] rounded-full bg-rose-400/20 blur-3xl" />
      </div>

      {/* writing card */}
      <form
        action={createPost}
        className="relative w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.4)] p-10 space-y-8"
      >
        {/* header */}
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            نوشتن شبنامه
          </h1>
          <p className="text-sm text-zinc-300 leading-relaxed max-w-xl">
            اینجا برای نوشتن است؛ برای فکرهایی که نمی‌شود بلند گفت.
          </p>
        </header>

        {/* title */}
        <div className="space-y-2">
          <label className="text-sm text-zinc-400">
            عنوان
          </label>
          <input
            name="title"
            required
            placeholder="عنوان نوشته را اینجا بنویس…"
            className="w-full bg-transparent border-b border-white/20 focus:border-indigo-400 outline-none py-3 text-xl placeholder:text-zinc-500 transition"
          />
        </div>

        {/* body */}
        <div className="space-y-2">
          <label className="text-sm text-zinc-400">
            متن
          </label>
          <textarea
            name="body"
            required
            rows={12}
            placeholder="شروع کن…"
            className="w-full resize-none bg-white/5 border border-white/10 rounded-2xl p-5 leading-loose focus:border-indigo-400 outline-none placeholder:text-zinc-500 transition"
          />
        </div>

        {/* footer */}
        <div className="flex items-center justify-between pt-6">
          <span className="text-xs text-zinc-400">
            بعد از انتشار، نوشته مستقیماً وارد وبلاگ می‌شود
          </span>

          <button
            type="submit"
            className="inline-flex items-center justify-center px-7 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-rose-500 text-white font-medium shadow-lg hover:brightness-110 transition"
          >
            انتشار
          </button>
        </div>
      </form>
    </main>
  )
}
