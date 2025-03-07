"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowBigLeft } from "lucide-react";

type Props = {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
};

const BackToExploreBtn = ({ variant = "default" }: Props) => {
  const router = useRouter();
  return (
    <Button
      variant={variant}
      onClick={() => router.push("/explore")}
      className="flex items-center gap-3"
    >
      <ArrowBigLeft size={20} />
      Back
    </Button>
  );
};

export default BackToExploreBtn;
