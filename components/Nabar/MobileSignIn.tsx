"use client";

import React from "react";
import { LoginButtonProps } from "../auth/loginBtn";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

type Props = {};

const MobileSignIn = (props: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open menu">
          <span className="sr-only">Open menu</span>
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[99999] w-40">
        <DropdownMenuItem asChild>
          <LoginButtonProps mode="modal" asChild>
            <Button variant="ghost" className="w-full justify-start px-4 py-2">
              Sign In
            </Button>
          </LoginButtonProps>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/auth/register"
            className="w-full cursor-pointer px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
          >
            Sign up
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileSignIn;
