"use client";

import { useGetOrganizations } from "@/hooks/create-course";
import { setCourseData } from "@/redux/slice/create-courseSlice";
import { useAppDispatch } from "@/redux/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OrganizerSelector = () => {
  const { data, isLoading } = useGetOrganizations();
  const dispatch = useAppDispatch();

  const handleSelect = (organizationId: string) => {
    const organization = data?.find((org) => org.id === organizationId);
    if (organization) {
      dispatch(setCourseData({ organizationId }));
    }
  };

  return (
    <div className="relative">
      <Select onValueChange={handleSelect} disabled={false}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select organization..." />
        </SelectTrigger>
        <SelectContent className="absolute z-[9999] border border-gray-200 bg-white shadow-md">
          {data?.map((org) => (
            <SelectItem key={org.id} value={org.id}>
              {org.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default OrganizerSelector;
