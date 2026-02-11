import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react'


const vazirmatn = localFont({
  src: [
    {
      path: '../public/fonts/Vazirmatn-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Vazirmatn-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
  display: 'swap',
})


export const metadata: Metadata = {
  title: "شب‌نامه",
  description: "شب‌نامه آزادی",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazirmatn.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
