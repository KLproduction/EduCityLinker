import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Nabar/Navbar";
import { ReactQueryProvider } from "@/react-query/provider";
import { ReduxProvider } from "@/redux/provider";
import NewNav from "@/components/Nabar/newNav";
import Modal from "@/components/modals/Modal";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { CreateCourseModal } from "@/components/modals/CreateCourseModal";
import { LoginModal } from "@/components/auth/LoginModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduCityLinker",
  description: "Your Learning Buddy",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <ReactQueryProvider>
          <ReduxProvider>
            <body className={inter.className}>
              <NuqsAdapter>
                <Toaster />
                <CreateCourseModal />
                <LoginModal />
                {children}
              </NuqsAdapter>
            </body>
          </ReduxProvider>
        </ReactQueryProvider>
      </html>
    </SessionProvider>
  );
}
