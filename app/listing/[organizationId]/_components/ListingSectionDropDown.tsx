import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ListingSection from "@/components/listing/ListingSection";
import { Listing } from "@prisma/client";
import ListingDetailSection from "./ListingDetails";
import CourseDetailDisplay from "./ListingDetailsCard";

type Props = {
  listing: Listing;
};

const ListingSectionDropdown = ({ listing }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4 h-full w-full">
      <div
        className="relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ListingSection listing={listing} />
        <div className="absolute left-2 top-2">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="mt-2 h-full w-full rounded-md border bg-white p-3 shadow-md transition duration-200 ease-in-out">
          <CourseDetailDisplay
            {...listing}
            courseLevel={listing.courseLevels}
            ageGroup={listing.ageGroups}
          />
        </div>
      )}
    </div>
  );
};

export default ListingSectionDropdown;
