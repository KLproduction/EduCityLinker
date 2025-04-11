"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import Image from "next/image";
import React from "react";
import { LoginButtonProps } from "../auth/loginBtn";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignOutBtn from "../auth/SignOutBtn";
import { signOutAction } from "@/actions/(auth)/signOut";
import { CgLogOut } from "react-icons/cg";
import { User } from "@prisma/client";
import { useCreateCourseModal, useCreateOrganizerModal } from "@/hooks/modal";
import { useRouter } from "next/navigation";

type Props = {
  image?: string;
  name?: string;
  className?: string;
  fallbackClassName?: string;
  userId?: string;
  isAdmin?: boolean;
  isOrganizer?: boolean;
};

const UserAvatar = ({
  image,
  name,
  className,
  fallbackClassName,
  userId,
  isAdmin,
}: Props) => {
  const onClickHandler = async () => {
    await signOutAction();
  };

  const router = useRouter();

  const { open: openCreateOrganizerModal } = useCreateOrganizerModal();
  const { open: openCreateCourseModal } = useCreateCourseModal();

  if (!userId) return;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className={cn("cursor-pointer", className)}>
          {image ? (
            <div
              className={cn("relative size-10 overflow-hidden rounded-full")}
            >
              <Image src={image} alt="image" fill className="object-cover" />
            </div>
          ) : (
            <AvatarFallback
              className={cn(
                "flex items-center justify-center bg-zinc-500",
                fallbackClassName,
              )}
            >
              {name ? name[0].toUpperCase() : "U"}
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        sideOffset={12}
        align="center"
        className="z-[99999] bg-zinc-50"
      >
        <DropdownMenuItem
          onClick={() => router.push(`/auth/setting`)}
          className="flex w-full flex-col items-start justify-start py-2 text-sm text-zinc-700"
        >
          My Profile
          <div className="mt-2 h-0.5 w-full bg-zinc-200" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/favorites/${userId}`)}
          className="flex w-full flex-col items-start justify-start py-2 text-sm text-zinc-700"
        >
          My Favorites
          <div className="mt-2 h-0.5 w-full bg-zinc-200" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/enrollment/${userId}`)}
          className="flex w-full flex-col items-start justify-start py-2 text-sm text-zinc-700"
        >
          My Enrollment
          <div className="mt-2 h-0.5 w-full bg-zinc-200" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/enrollment/${userId}`)}
          className="flex w-full flex-col items-start justify-start py-2 text-sm text-zinc-700"
        >
          My Courses
          <div className="mt-2 h-0.5 w-full bg-zinc-200" />
        </DropdownMenuItem>

        {isAdmin && (
          <DropdownMenuItem
            onClick={() => router.push("/dashboard")}
            className="flex w-full flex-col items-start justify-start py-2 text-sm text-zinc-700"
          >
            DashBoard
            <div className="mt-2 h-0.5 w-full bg-zinc-200" />
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          className="flex w-full items-center justify-start gap-3 py-2 text-sm text-zinc-700"
          onClick={() => onClickHandler()}
        >
          Sign Out
          <CgLogOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
