import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "شبنامه",
  description: "وبسایت شبنامه",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="fa">
      <body>
        {children}
      </body>
    </html>
  );
}
