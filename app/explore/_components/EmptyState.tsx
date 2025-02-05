"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
};

const EmptyState = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters",
  showReset,
}: Props) => {
  const router = useRouter();
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="text-sm text-muted-foreground">{subtitle}</p>

      <div className="mt-4">
        {showReset && (
          <Button variant={"outline"} onClick={() => router.push("/explore")}>
            Remove all filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
