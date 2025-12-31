import { AIMO_DISCOUNT, brandName } from "@/data/data";
import { formattedPrice } from "@/lib/formatPrice";
import { Listing, Organization } from "@prisma/client";
import { Badge, Book, Calendar, Check, MapPin, Users } from "lucide-react";
import { Card } from "../ui/card";

type Props = {
  listing: Listing;
};

const ListingSection = ({ listing }: Props) => {
  return (
    <div className="mt-4 space-y-4">
      <Card className="flex w-full max-w-[280px] flex-col flex-wrap gap-4 rounded-md border-2 border-rose-200 p-4 sm:grid sm:max-w-7xl sm:grid-cols-[1fr_2fr_auto]">
        {/* Course Type (Stacks on small screens) */}
        <div className="flex items-center whitespace-nowrap text-xs font-semibold sm:text-base">
          <Book size={16} className="mr-2 flex-shrink-0" />
          {listing.courseType}
        </div>

        {/* Listing Details (Switches to 1 column on small screens) */}
        <div className="grid grid-cols-1 gap-2 text-sm text-gray-600 sm:grid-cols-2">
          <div className="flex items-center">
            <Users size={14} className="mr-1" />
            {listing.maxStudents} Max students
          </div>
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            {listing.durationWeeks} weeks
          </div>
          <div className="flex items-center">
            <Badge size={14} className="mr-1" />
            {listing.ageGroups}
          </div>
          <div className="flex items-center">
            <Badge size={14} className="mr-1" />
            {listing.courseLevels}
          </div>
        </div>

        {/* Price (Always right-aligned) */}
        <div className="flex flex-col items-start justify-start gap-3">
          <div className="text-right text-sm text-zinc-500">
            {`Original Price: ${" "}${formattedPrice(listing.price)}/week`}
          </div>
          <div className="flex items-end gap-5 text-right text-sm font-bold text-rose-500 sm:text-base">
            <div className="flex items-end gap-2">
              <h4 className="text-xl">{brandName}</h4>
              Price:
            </div>
            {formattedPrice(listing.price * AIMO_DISCOUNT)}/week
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ListingSection;
