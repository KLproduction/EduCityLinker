import { formattedPrice } from "@/lib/formatPrice";
import { Listing, Organization } from "@prisma/client";
import { Badge, Book, Calendar, Check, MapPin, Users } from "lucide-react";

type Props = {
  listing: Listing;
};

const ListingSection = ({ listing }: Props) => {
  return (
    <div className="mt-4 space-y-4">
      <div className="grid w-full gap-4 rounded-md border p-4 sm:grid-cols-[1fr_2fr_auto]">
        {/* Course Type (Stacks on small screens) */}
        <div className="flex items-center whitespace-nowrap text-base font-semibold">
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
        <div className="text-right text-base font-bold text-green-600">
          {formattedPrice(listing.price)}
        </div>
      </div>
    </div>
  );
};

export default ListingSection;
