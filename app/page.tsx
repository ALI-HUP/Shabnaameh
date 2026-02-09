import Link from 'next/link'
import Image from 'next/image'
import Logo from "@/public/logo/logo.jpg"

export default function HomePage() {
  return (
    <main
      dir="rtl"
      className="relative min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-1/3 w-130 h-130 rounded-full bg-indigo-500/25 blur-[140px]" />
        <div className="absolute top-1/2 -left-32 w-105 h-105 rounded-full bg-fuchsia-500/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-90 h-90 rounded-full bg-cyan-400/15 blur-[120px]" />
      </div>

      <section className="relative mx-auto max-w-3xl px-6 py-32 space-y-28">

        <header className="space-y-10">
          <div className="flex gap-5">
            <h1 className="text-6xl font-bold tracking-tight text-white mt-4">
              شب‌نامه
            </h1>
            <Image src={Logo} alt="شب‌نامه" width={70} height={70} className="flex items-center justify-center" />
          </div>

          <p className="text-xl leading-relaxed text-zinc-300">
            در سال‌های منتهی به ۱۳۵۷، شب‌ها نامه‌هایی بی‌امضا،
            بی‌صدا و مخفیانه به خانه‌ها می‌رسید.
          </p>
        </header>

        <div className="h-px w-full bg-linear-to-l from-transparent via-indigo-400/80 to-transparent" />

        <section className="relative space-y-6 text-zinc-300 leading-relaxed pr-6">
          <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-indigo-400 via-fuchsia-400 to-transparent" />

          <p>
            نوشته‌هایی که امکان گفتنشان در روز نبود.
          </p>

          <p>
            آن نوشته‌ها را <span className="text-white">شب‌نامه</span> می‌نامیدند.
          </p>
        </section>

        <section className="flex items-center gap-6">
          <span className="text-sm text-zinc-400">۱۳۵۷</span>
          <div className="flex-1 h-0.5 bg-linear-to-l from-fuchsia-400 via-indigo-400 to-cyan-400" />
          <span className="text-sm text-zinc-400">۱۴۰۴</span>
        </section>

        <section className="space-y-6 text-zinc-300 leading-relaxed">
          <p>
            امروز شب‌نامه دیگر کاغذی نیست،
            اما اعتراض هنوز زنده است.
          </p>

          <p>
            اینجا جایی‌ست برای نوشتن،
            برای ثبت،
            برای گفتن آنچه نباید فراموش شود.
          </p>
        </section>

        <section className="relative space-y-6 text-zinc-300 leading-relaxed pr-6">
          <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-cyan-400 via-indigo-400 to-transparent" />

          <p>
            شب‌نامه نه حزب است،
            نه رسانه،
            نه سخنگو.
          </p>

          <p>
            شب‌نامه مجموعه‌ای‌ست از صداها؛
            روایت ها,
            مستقل،
            بی‌نام،
            و آزاد. (در پی اعتراض)
          </p>
        </section>

        <footer className="pt-20 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-4 px-10 py-3 rounded-full border border-white/20 text-sm text-white hover:border-indigo-400 transition"
          >
            <span>خواندن شب‌نامه‌ها</span>
            <span className="text-indigo-400 group-hover:-translate-x-1 transition">
              ←
            </span>
          </Link>

          <Link
            href="/write"
            className="inline-flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition"
          >
            <span>نوشتن شب‌نامه</span>
            <span className="opacity-60">←</span>
          </Link>
        </footer>

      </section>
    </main>
  )
}
