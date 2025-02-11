"use client";
import { formattedPrice } from "@/lib/formatPrice";
import { ExtenderUser } from "@/next-auth";
import { Enrollment, Listing, Organization } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "./HeartButton";
import { Button } from "../ui/button";

type Props = {
  organizer: Organization;
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
  organizer,
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
    <div className="group col-span-1 cursor-pointer justify-center">
      <div className="flex flex-col gap-2">
        {organizer.logo && (
          <div className="relative h-[250px] w-[250px] overflow-hidden rounded-xl border border-red-500">
            <Image
              src={`${process.env.NEXT_PUBLIC_UPLOADCARE_BASE_URL}/${organizer.coverPhoto}/-/preview/500x500/`}
              alt="listing"
              fill
              className="object-cover transition duration-300 group-hover:scale-110"
            />
            <div className="absolute right-3 top-3">
              <HeartButton id={data.id} currentUser={currentUser || null} />
            </div>
          </div>
        )}
        <div className="text-lg font-semibold">{organizer.location}</div>
        <div className="font-light text-zinc-500">
          {enrollmentDate || data.courseType}
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
        <Button onClick={() => router.push(`/listing/${data.id}`)}>
          View Details
        </Button>
      </div>
    </div>
  );
};

export default ListingCard;
