"use client";

import { AiOutlineMenu } from "react-icons/ai";
import { Button } from "../ui/button";
import UserAvatar from "../auth/global/UserAvatar";
import { useEffect, useState } from "react";
import { currentUser } from "@/lib/auth";
import { ExtenderUser } from "@/next-auth";
import { LoginButtonProps } from "../auth/loginBtn";
import Link from "next/link";
import SignOutBtn from "../auth/SignOutBtn";

type Props = {};

const UserMenu = (props: Props) => {
  const [user, setUser] = useState<ExtenderUser | null>(null);
  useEffect(() => {
    const getUser = async () => {
      const user = await currentUser();
      if (user) setUser(user);
    };
    getUser();
  }, []);
  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <Button
          onClick={() => {
            console.log("clicked");
          }}
          className="hidden rounded-full transition md:block"
        >
          Explore your next course
        </Button>
        <Button variant={"ghost"} className="flex gap-3">
          <AiOutlineMenu />
        </Button>
        <UserAvatar name={user?.name!} userId={user?.id} image={user?.image!} />
      </div>
    </div>
  );
};

export default UserMenu;
