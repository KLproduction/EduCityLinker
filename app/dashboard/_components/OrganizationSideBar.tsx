"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { RiAddCircleFill } from "react-icons/ri";
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
import OrganizationSwitcher from "./OrganizationSwitcher";
import { useCreateCourseModal } from "@/hooks/modal";
import { ExtenderUser } from "@/next-auth";
import { Listing } from "@prisma/client";

type OrganizationList = {
  name: string;
  id: string;
}[];

type Props = {
  organizations: OrganizationList;
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
  const { open } = useCreateCourseModal();

  return (
    <div className="flex flex-col gap-6">
      {/* Org switcher */}
      <div>
        <p className="mb-2 text-sm font-semibold text-muted-foreground">
          Current Organization
        </p>
        <OrganizationSwitcher
          organizations={organizations}
          organizationId={organizationId}
          user={user}
        />
      </div>

      <Separator />

      {/* Header & Add Button */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold uppercase text-zinc-800">Courses</p>
        <Button
          size="icon"
          variant="ghost"
          onClick={open}
          className="hover:bg-zinc-100"
        >
          <RiAddCircleFill size={20} className="text-zinc-500" />
        </Button>
      </div>

      {/* Listing Section */}
      <div className="space-y-3">
        {listings.length ? (
          listings.map((listing) => (
            <Link key={listing.id} href={`/dashboard/listing/${listing.id}`}>
              <Card className="transition hover:bg-zinc-50">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-zinc-900">
                    {listing.title}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No courses yet.</p>
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
          <CardContent className="flex flex-col gap-6">
            <ListingsContent
              organizations={organizations}
              organizationId={organizationId}
              user={user}
              listings={listings}
            />
          </CardContent>
        </Card>
      </aside>

      {/* Mobile Sidebar (Sheet) */}
      <div className="fixed bottom-4 right-4 z-50 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button size="lg" className="rounded-full shadow-lg">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="z-[9999] h-[75vh] overflow-y-auto px-4"
          >
            <SheetHeader>
              <SheetTitle className="text-left">Organization</SheetTitle>
            </SheetHeader>
            <div className="py-6">
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
