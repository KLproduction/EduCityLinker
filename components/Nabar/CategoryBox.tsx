"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons/lib";
import qs from "query-string";

type Props = {
  label: string | null;
  icon: IconType;
  description?: string;
  selected?: boolean;
};

const CategoryBox = ({ label, icon: Icon, description, selected }: Props) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updateQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updateQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/explore",
        query: updateQuery,
      },
      { skipNull: true },
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "border-b2 flex cursor-pointer items-center justify-center gap-5 p-3 transition hover:text-zinc-800",
        selected
          ? "border-b-2 border-zinc-800 text-zinc-800"
          : "border-transparent text-zinc-500",
      )}
    >
      <Icon size={26} />
      {!label && <div className="text-xs font-medium">All</div>}
      <div className="flex justify-center text-sm font-medium">{label}</div>
    </div>
  );
};

export default CategoryBox;
