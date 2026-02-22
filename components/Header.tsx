'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Logo from '@/public/logo/logo.jpg'

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
      <div className="flex items-stretch rounded-lg border border-gray-700 bg-slate-800/95 shadow-lg shadow-black/85">

        <Link href="/" className="flex relative z-10">
          <Image
            src={Logo}
            alt="Logo"
            width={40}
            height={40}
            className="h-full w-auto object-cover rounded-lg animate-simple-pulse will-change-transform drop-shadow-[0_0_10px_rgba(300,50,80,0.7)]"
          />
        </Link>

        <nav className="flex flex-1 items-center justify-end gap-5 sm:gap-7 px-6 sm:px-8 py-3 text-sm sm:text-base">
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
