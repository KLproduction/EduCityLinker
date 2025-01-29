"use client";

import { auth } from "@/auth";
import { LoginForm } from "@/components/auth/LoginForm";
import { currentUser } from "@/lib/auth";
import { ExtenderUser } from "@/next-auth";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const [user, setUser] = useState<ExtenderUser | null>(null);
  const [count, setCount] = useState(0);
  const route = useRouter();

  useEffect(() => {
    (async () => {
      const data = await currentUser();
      if (data?.id) {
        setUser(data);
        setCount((p) => p + 1);
      }
    })();
  }, []);

  useEffect(() => {
    if (user) {
      route.push("/");
    }
  }, [count]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-800">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
