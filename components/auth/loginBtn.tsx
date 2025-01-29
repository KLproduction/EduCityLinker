"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { LoginForm } from "./LoginForm";
import { useRef } from "react";
import { Button } from "../ui/button";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButtonProps = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
  const ref = useRef();
  const route = useRouter();
  const onClick = () => {
    route.push("/auth/login");
  };
  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="z-[9999] w-auto border-none bg-transparent bg-white p-0">
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Button onClick={onClick} className="m-0 cursor-pointer p-0">
        {children}
      </Button>
    );
  }
};
