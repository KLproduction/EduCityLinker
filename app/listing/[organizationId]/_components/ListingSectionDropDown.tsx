"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ListingSection from "@/components/listing/ListingSection";
import { Listing, Organization } from "@prisma/client";
import CourseDetailDisplay from "./ListingDetailsCard";
import { useCreateEnrollmentModal } from "@/hooks/modal";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Button } from "@/components/ui/button";

type Props = {
  listing: Listing;
};

const ListingSectionDropdown = ({ listing }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { open } = useCreateEnrollmentModal();

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
        <div className="mt-2 flex h-full w-full flex-col rounded-md border bg-white p-3 shadow-md transition duration-200 ease-in-out">
          <CourseDetailDisplay
            {...listing}
            courseLevel={listing.courseLevels}
            ageGroup={listing.ageGroups}
          />
          <div className="flex w-full justify-center">
            <div className="flex w-full md:hidden">
              <Button className="w-full">Enrollment</Button>
            </div>
            <div className="hidden md:block">
              <InteractiveHoverButton
                text="Enrollment"
                onClick={() => open(listing.id, listing.organizationId)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingSectionDropdown;
