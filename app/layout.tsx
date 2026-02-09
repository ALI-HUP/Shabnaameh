import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'


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
  title: "شبنامه",
  description: "وبسایت شبنامه 📜",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="fa">
      <body className={vazirmatn.className}>
        {children}
      </body>
    </html>
  );
}
