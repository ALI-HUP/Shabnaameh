'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  const linkClass = (href: string) =>
    `transition-colors ${
      pathname === href
        ? 'text-rose-500'
        : 'text-stone-300 hover:text-stone-100'
    }`

  return (
    <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[80%] md:w-[60%] max-w-5xl">
      <div className="flex items-center justify-between rounded-lg bg-slate-800/90 border border-gray-700 px-6 sm:px-8 py-3 shadow-lg shadow-black/80">

        <Link
          href="/"
          className="text-sm sm:text-base font-semibold tracking-tight text-stone-100"
        >
          شب‌نامه
        </Link>

        <nav className="flex items-center gap-5 sm:gap-7 text-sm sm:text-base">
          <Link href="/blogs" className={linkClass('/blogs')}>
            شب‌نامه‌ها
          </Link>
          <Link href="/write" className={linkClass('/write')}>
            نوشتن
          </Link>
        </nav>

      </div>
    </header>
  )
}
