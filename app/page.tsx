import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo/logo.jpg";
import Header from "@/components/Header";

export default function HomePage() {
  return (
    <main
      dir="rtl"
      className="relative py-20 md:py-24 p-3 sm:p-5 md:p-7 min-h-screen bg-black text-stone-100"
      style={{
        backgroundImage: "url('/background/photo_2026-02-09_22-46-50.jpg')",
        backgroundSize: "cover",
      }}
    >
    <Header />

      <div className="pointer-events-none absolute inset-0 bg-red-700/45 mix-blend-multiply" />
      <div className="pointer-events-none absolute inset-0 bg-black/30" />

      <section className="relative mx-auto max-w-4xl px-5 sm:px-7 md:px-7 py-1 sm:py-2 md:pt-28 space-y-20 sm:space-y-28 bg-black/60 backdrop-blur-sm rounded-2xl">
        <header className="space-y-8 sm:space-y-12 text-center md:text-right">
          <div className="flex items-center justify-start gap-4 sm:gap-6">
            <div className="relative">
              <Image
                src={Logo}
                alt="شب‌نامه"
                width={64}
                height={64}
                className="rounded-lg sm:w-20 sm:h-20"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
              شب‌نامه
            </h1>
          </div>

          <p className="text-xl sm:text-2xl md:text-3xl leading-relaxed max-w-3xl mx-auto md:mx-0 text-stone-200">
            شب‌نامه جایی‌ست برای نوشتن؛  
            برای روایت‌هایی که جایی در رسانه ندارند،  
            اما باید بمانند.
          </p>
        </header>

        <div className="flex items-center gap-4 sm:gap-6 w-full max-w-xl mx-auto md:max-w-none md:mx-0">
          <span className="text-base sm:text-lg font-bold text-red-700">۱۳۵۷</span>
          <div className="flex-1 border border-red-700" />
          <span className="text-base sm:text-lg font-bold text-red-700">۱۴۰۴</span>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 md:gap-14 text-base sm:text-lg leading-loose">
          <div className="space-y-5 sm:space-y-6 bg-gray-950/70 backdrop-blur-sm p-5 sm:p-7 md:p-8 rounded-lg border-r-4 border-red-700 shadow-md">
            <p>در سال‌های منتهی به ۱۳۵۷، شب‌ها نامه‌هایی بی‌امضا، بی‌صدا و مخفیانه به خانه‌ها می‌رسید.</p>
          </div>
          <div className="space-y-5 sm:space-y-6 bg-gray-950/70 backdrop-blur-sm p-5 sm:p-7 md:p-8 rounded-lg border-r-4 border-red-700 shadow-md">
            <p>نوشته‌هایی که امکان گفتنشان در روز نبود. آن نوشته‌ها را شب‌نامه می‌نامیدند.</p>
          </div>
          <div className="space-y-5 sm:space-y-6 bg-gray-950/70 backdrop-blur-sm p-5 sm:p-7 md:p-8 rounded-lg border-r-4 border-red-700 shadow-md">
            <p>آن نوشته‌ها شب‌نامه بودند؛ نه برای فریاد، برای ماندن.</p>
          </div>
          <div className="space-y-5 sm:space-y-6 bg-gray-950/70 backdrop-blur-sm p-5 sm:p-7 md:p-8 rounded-lg border-r-4 border-red-700 shadow-md">
            <p>امروز شب‌نامه دیگر کاغذی نیست، اما اعتراض هنوز یک عمل است.</p>
          </div>
        </section>

        <section className="relative text-lg sm:text-xl bg-gray-950/75 backdrop-blur-md border-r-8 border-red-700 px-6 sm:px-8 py-8 sm:py-10 leading-relaxed rounded-lg shadow-2xl">
          شب‌نامه نه حزب است،  
          نه رسانه،  
          نه تریبون؛
          <br />
          شب‌نامه مجموعه‌ای‌ست از صداها؛ روایت‌ها، مستقل، بی‌نام، و آزاد.
          <br />
          <span className="font-bold text-red-700">(در پی اعتراض)</span>
        </section>

        <footer className="pt-8 sm:pt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-end">
          <Link
            href="/blogs"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-red-700 text-white font-medium rounded-lg hover:bg-red-800 transition-all text-base sm:text-base"
          >
            خواندن شب‌نامه
          </Link>

          <Link
            href="/write"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-red-700 text-stone-200 font-medium rounded-lg hover:bg-red-700/30 transition-all text-base sm:text-base"
          >
            نوشتن شب‌نامه
          </Link>
        </footer>
        <div className="text-white flex text-sm items-center justify-center p-5">
          <p>
            برای تجربه بهتر، از لپتاپ استفاده کنید.
          </p>
        </div>
      </section>
    </main>
  );
}
