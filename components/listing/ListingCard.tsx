"use client";
import { formattedPrice } from "@/lib/formatPrice";
import { ExtenderUser } from "@/next-auth";
import { Enrollment, Listing } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "./HeartButton";
import { Button } from "../ui/button";

type Props = {
  data: Listing;
  currentUser?: ExtenderUser | null;
  enrollment?: Enrollment;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
};

const ListingCard = ({
  data,
  currentUser,
  enrollment,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
}: Props) => {
  const router = useRouter();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;
      onAction?.(actionId);
    },
    [onAction, actionId, disabled],
  );

  const price = useMemo(() => {
    if (enrollment) {
      return formattedPrice(enrollment.totalPrice);
    }
    return formattedPrice(data.price);
  }, [enrollment, data.price]);

  const enrollmentDate = useMemo(() => {
    if (enrollment) {
      const start = new Date(enrollment.startDate);
      const end = new Date(enrollment.endDate);

      return `${format(start, "PP")} - ${format(end, "PP")}`;
    }
    return null;
  }, [enrollment]);
  return (
    <div
      className="group col-span-1 cursor-pointer justify-center"
      // onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="flex flex-col gap-2">
        <div className="relative h-[250px] w-[250px] overflow-hidden rounded-xl border border-red-500">
          <Image
            src={`${data.imageSrc}-/scale_crop/300x300/`}
            alt="listing"
            fill
            className="object-cover transition duration-300 group-hover:scale-110"
          />
          <div className="absolute right-3 top-3">
            <HeartButton
              listingId={data.id}
              currentUser={currentUser || null}
            />
          </div>
        </div>
        <div className="text-lg font-semibold">{data.location}</div>
        <div className="font-light text-zinc-500">
          {enrollmentDate || data.category}
        </div>
        <div className="flex items-center gap-1">
          <div className="font-semibold">{formattedPrice(data.price)}</div>
          {!enrollment && <div className="font-light">people</div>}
        </div>
        {onAction && actionLabel && (
          <Button disabled={disabled} onClick={handleCancel}>
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ListingCard;
