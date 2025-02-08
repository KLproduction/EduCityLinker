import { Avatar } from "@/components/ui/avatar";
import { Organization, User } from "@prisma/client";
import { IconType } from "react-icons/lib";

type Props = {
  organizer: Organization;
  category: string;
  description: string;
  courseLevels: string;
  ageGroups: string;
  durationWeeks: number;
  maxStudents: number;
  location: string;
  lat: number;
  lng: number;
};

const ListingInfo = ({
  organizer,
  category,
  description,
  courseLevels,
  ageGroups,
  durationWeeks,
  maxStudents,
  location,
  lat,
  lng,
}: Props) => {
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2 text-xl font-semibold">
          <div>Hosted by {organizer.name}</div>
          {organizer.logo && (
            <img
              src={organizer.logo || undefined}
              alt=""
              className="h-12 w-12 object-cover"
            />
          )}
          <div className="flex items-center gap-4 font-light text-zinc-500">
            <div>{courseLevels}</div>
            <div>{ageGroups}</div>
            <div>{durationWeeks} weeks</div>
            <div>{maxStudents} students</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingInfo;
