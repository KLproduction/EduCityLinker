"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateOrganizerModal } from "@/hooks/modal";
import { useGetOrganization } from "@/hooks/organization";

import { useParams, useRouter } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

const OrganizationSwitcher = () => {
  const { data } = useGetOrganization();
  const router = useRouter();
  const params = useParams();

  const onSelect = (organizationId: string) => {
    router.push(`/dashboard/organization/${organizationId}`);
  };
  const { open } = useCreateOrganizerModal();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold uppercase text-zinc-800">
          Organization
        </p>
        <RiAddCircleFill
          size={20}
          className="cursor-pointer text-zinc-500 transition hover:opacity-75"
          onClick={open}
        />
      </div>
      <Select
        onValueChange={onSelect}
        value={(params.organizationId as string) || undefined}
      >
        <SelectTrigger className="my-4 w-full bg-zinc-50 p-3 font-medium">
          <SelectValue placeholder="No organization selected" />
        </SelectTrigger>
        <SelectContent>
          {data &&
            data.map((organization) => (
              <SelectItem
                key={organization.id}
                value={organization.id}
                className="cursor-pointer"
              >
                <div className="flex items-center justify-start gap-3 font-medium">
                  <p className="truncate">{organization.name}</p>
                </div>
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default OrganizationSwitcher;
