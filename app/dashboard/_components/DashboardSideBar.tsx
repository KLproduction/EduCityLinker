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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import OrganizationSwitcher from "./OrganizationSwitcher";
import { useGetListingByOrganizationId } from "@/hooks/listing";

const DashboardContent = ({ organizationId }: { organizationId: string }) => {
  const router = useRouter();
  const { data } = useGetListingByOrganizationId(organizationId);
  const listings = data?.listing;

  const handleEditOrganization = () => {
    if (organizationId) {
      router.push(`/dashboard/organization/${organizationId}`);
    } else {
      toast.error("You have no organization to edit");
    }
  };
  return (
    <div className="flex flex-col justify-start gap-8">
      <Button variant={"ghost"} onClick={handleEditOrganization}>
        Edit Organization
      </Button>
      <Separator />
      <div className="flex flex-col gap-4">
        <Button
          variant={"ghost"}
          onClick={() => router.push(`/dashboard/enrollment`)}
        >
          Enrollments
        </Button>
        <Separator />
        <div>Dummy</div>
        <Separator />
        <div>Dummy</div>
      </div>
    </div>
  );
};

const DashboardSideBar = ({ organizationId }: { organizationId: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sticky top-24 hidden h-full p-4 lg:block">
        <Card className="h-full w-full">
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
          </CardHeader>

          <CardContent className="flex h-full w-full flex-col justify-start gap-8">
            <DashboardContent organizationId={organizationId} />
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
              <DashboardContent organizationId={organizationId} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default DashboardSideBar;
