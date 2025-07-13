"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateOrganizerModal } from "@/hooks/modal";
import { ExtenderUser } from "@/next-auth";
import { UserRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

type organizationList = {
  name: string;
  id: string;
}[];

type Props = {
  organizations: organizationList;
  organizationId: string;
  user: ExtenderUser;
};

const OrganizationSwitcher = ({
  organizations,
  organizationId,
  user,
}: Props) => {
  const router = useRouter();

  const onSelect = (organizationId: string) => {
    router.push(`/dashboard/organization/${organizationId}`);
  };
  const { open } = useCreateOrganizerModal();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        {user.role === UserRole.ADMIN && (
          <p className="text-sm font-semibold uppercase text-zinc-800">
            Organization
          </p>
        )}
        {user.role === UserRole.ADMIN && (
          <RiAddCircleFill
            size={20}
            className="cursor-pointer text-zinc-500 transition hover:opacity-75"
            onClick={open}
          />
        )}
      </div>
      {user.role === "ADMIN" ? (
        <Select
          onValueChange={onSelect}
          value={(organizationId as string) || undefined}
        >
          <SelectTrigger className="my-4 w-full bg-zinc-50 p-3 font-medium">
            <SelectValue placeholder="No organization selected" />
          </SelectTrigger>
          <SelectContent>
            {organizations &&
              organizations.map((organization) => (
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
      ) : (
        <div>{organizations && organizations[0]?.name}</div>
      )}
    </div>
  );
};

export default OrganizationSwitcher;
