"use client";

import { useState } from "react";
import {
  Menu,
  Building2,
  BookOpenText,
  ArrowRightLeft,
  User,
} from "lucide-react";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
    <div className="flex flex-col gap-6">
      <section>
        <CardTitle className="mb-2 text-base">Organization</CardTitle>
        <DashboardNavItem
          icon={<Building2 className="h-4 w-4" />}
          label="Edit Organization"
          href={`/dashboard/organization/${organizationId}`}
        />
      </section>

      <Separator />

      <section className="flex flex-col gap-2">
        <CardTitle className="mb-2 text-base">Manage</CardTitle>
        <DashboardNavItem
          icon={<BookOpenText className="h-4 w-4" />}
          label="Enrollments"
          href={`/dashboard/enrollment/`}
        />
        <DashboardNavItem
          icon={<User className="h-4 w-4" />}
          label="Users"
          href={`/dashboard/user/`}
        />
        <DashboardNavItem
          icon={<ArrowRightLeft className="h-4 w-4" />}
          label="Enrollment Payments"
          href={`/dashboard/payment/`}
        />
        <DashboardNavItem
          icon={<ArrowRightLeft className="h-4 w-4" />}
          label="Enrollment Cancellations"
          href={`/dashboard/cancellation/`}
        />
      </section>

      <Separator />

      <section>
        <CardTitle className="mb-2 text-base">Settings</CardTitle>
        <DashboardNavItem
          icon={<ArrowRightLeft className="h-4 w-4" />}
          label="Switch Organization"
          href="/dashboard/switch-organization"
        />
      </section>
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
          <CardContent className="flex flex-col gap-8">
            <DashboardContent organizationId={organizationId} />
          </CardContent>
        </Card>
      </aside>

      {/* Mobile Sheet */}
      <div className="fixed bottom-4 right-4 z-50 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button size="lg" className="rounded-full shadow-lg">
              <Menu className="h-5 w-5" />
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

type DashboardNavItemProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
  onClick?: () => void;
};

export const DashboardNavItem = ({
  icon,
  label,
  href,
  onClick,
}: DashboardNavItemProps) => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className="justify-start gap-2"
      onClick={() => {
        if (onClick) onClick();
        router.push(href);
      }}
    >
      {icon}
      {label}
    </Button>
  );
};

export default DashboardSideBar;
