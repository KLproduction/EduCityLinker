"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { LoginModal } from "@/components/auth/LoginModal";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/react-query/provider";
import { ReduxProvider } from "@/redux/provider";

type ProvidersProps = {
  children: React.ReactNode;
  session: Session | null;
};

export function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <ReactQueryProvider>
        <ReduxProvider>
          <NuqsAdapter>
            <Toaster />
            <LoginModal />
            {children}
          </NuqsAdapter>
        </ReduxProvider>
      </ReactQueryProvider>
    </SessionProvider>
  );
}
