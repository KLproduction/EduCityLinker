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

const DashboardContent = ({ organizationId }: { organizationId: string }) => {
  return (
    <div className="flex flex-col justify-start gap-8">
      <Link href={`dashboard/organization/${organizationId}`}>
        Edit Organization
      </Link>
      <Separator />
      <h1>Dashboard Content</h1>
      <Separator />
      <h1>Dashboard Content</h1>
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
            className="z-[9999] h-[100vh] overflow-y-auto"
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
