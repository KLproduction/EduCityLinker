import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/react-query/provider";
import { ReduxProvider } from "@/redux/provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { CreateCourseModal } from "@/components/modals/CreateCourseModal";
import { LoginModal } from "@/components/auth/LoginModal";
import { CreateOrganizerModal } from "@/components/modals/CreateOrganizerModal";
import { getUserById } from "@/data/user";
import { Analytics } from "@vercel/analytics/next";

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

  const user = await getUserById(session?.user.id as string);
  const organizationId = user?.organization[0].id;

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <ReactQueryProvider>
            <ReduxProvider>
              <NuqsAdapter>
                <Toaster />
                <CreateCourseModal
                  user={user}
                  organizationId={organizationId}
                />
                <CreateOrganizerModal />
                <LoginModal />
                {children}
                <Analytics />
              </NuqsAdapter>
            </ReduxProvider>
          </ReactQueryProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
