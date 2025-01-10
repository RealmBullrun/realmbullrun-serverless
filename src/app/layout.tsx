import "./globals.css";
import localFont from 'next/font/local'
const myFont = localFont({ src: '../../asset/fonts/MontserratRegular-RpK6l.ttf', weight: '500' })

import { Providers } from "../components/layouts/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` text-lg h-[calc(100vh-120px)]`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
