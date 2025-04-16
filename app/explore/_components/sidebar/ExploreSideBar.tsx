"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import AgeGroupFilter from "./AgeGroupFilter";
import CourseLevelsFilter from "./CourseLevelsFilter";
import PriceFilter from "./PriceFilter";
import AccommodationTypeFilter from "./AccommodationTypeFilter";
import CitiesFilter from "./CitiesFilter";

const FilterContent = () => {
  return (
    <div className="flex w-[80%] flex-col justify-start gap-8">
      <CitiesFilter />
      <PriceFilter />
      <Separator className="my-4" />
      <AgeGroupFilter />
      <Separator className="my-4" />
      <CourseLevelsFilter />
      <Separator className="my-4" />
      <AccommodationTypeFilter />
    </div>
  );
};

const ExploreSideBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden min-h-screen p-4 lg:block">
        <Card className="h-full w-full">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>

          <CardContent className="flex h-full w-full flex-col justify-start gap-8">
            <FilterContent />
          </CardContent>
        </Card>
      </aside>

      {/* Mobile Filter Button & Sheet */}
      <div className="fixed bottom-4 left-4 z-50 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className={open ? "hidden" : ""}>
            <Button size="sm" className="rounded-full shadow-lg">
              <Filter className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="z-[9999] h-full overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <FilterContent />
            </div>
            <SheetFooter className="sticky bottom-0 flex w-full flex-col gap-2 bg-background pt-4">
              <Button className="flex-1" onClick={() => setOpen(false)}>
                Apply Filters
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default ExploreSideBar;
