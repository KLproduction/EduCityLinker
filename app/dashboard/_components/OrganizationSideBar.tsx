"use client";

import { useState } from "react";
import { Filter, Menu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import OrganizationSwitcher from "./OrganizationSwitcher";
import { useGetListingByOrganizationId } from "@/hooks/listing";
import { RiAddCircleFill } from "react-icons/ri";
import { useCreateCourseModal } from "@/hooks/modal";
import { ExtenderUser } from "@/next-auth";
import { Listing } from "@prisma/client";

type organizationList = {
  name: string;
  id: string;
}[];

type Props = {
  organizations: organizationList;
  organizationId: string;
  user: ExtenderUser;
  listings: Listing[];
};

const ListingsContent = ({
  organizations,
  organizationId,
  user,
  listings,
}: Props) => {
  const params = useParams();

  const { open } = useCreateCourseModal();
  console.log("listings", listings);
  return (
    <div className="flex flex-col justify-start gap-8">
      <OrganizationSwitcher
        organizations={organizations}
        organizationId={organizationId}
        user={user}
      />

      <Separator />
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold uppercase text-zinc-800">Course</p>
        <RiAddCircleFill
          size={20}
          className="cursor-pointer text-zinc-500 transition hover:opacity-75"
          onClick={open}
        />
      </div>
      <div className="flex flex-col gap-4">
        {listings?.length && (
          <div className="flex flex-col gap-4">
            {listings.map((listing) => (
              <Link key={listing.id} href={`/dashboard/listing/${listing.id}`}>
                <div className="flex items-center justify-between gap-4 rounded-lg bg-zinc-50 p-4">
                  <div>
                    <p className="text-lg font-semibold">{listing.title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const OrganizationSideBar = ({
  organizations,
  organizationId,
  user,
  listings,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sticky top-24 hidden h-full p-4 lg:block">
        <Card className="h-full w-full">
          <CardHeader>
            <CardTitle>Organization</CardTitle>
          </CardHeader>

          <CardContent className="flex h-full w-full flex-col justify-start gap-8">
            <ListingsContent
              organizations={organizations}
              organizationId={organizationId}
              user={user}
              listings={listings}
            />
          </CardContent>
        </Card>
      </aside>

      {/* Mobile Filter Button & Sheet */}
      <div className="fixed bottom-4 right-4 z-50 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className={open ? "hidden" : ""}>
            <Button size="lg" className="rounded-full shadow-lg">
              <Menu className="mr-2 h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="z-[9999] h-[70vh] overflow-y-auto"
          >
            <SheetHeader>
              <SheetTitle>Dashboard</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <ListingsContent
                organizations={organizations}
                organizationId={organizationId}
                user={user}
                listings={listings}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default OrganizationSideBar;
