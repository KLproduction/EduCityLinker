import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduCityLinker",
  description: "Your Learning Buddy",
  alternates: {
    canonical: "https://edu-city-linker.vercel.app",
  },
  verification: {
    google: "yk8bo8dOqUOUYr7iXGkKjECh1JzXFvUU_a3sJ_NulfQ",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/SHOWG.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <Providers session={session}>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
