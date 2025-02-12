import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AgeGroupFilter from "./AgeGroupFilter";
import { Separator } from "@/components/ui/separator";
import CourseLevelsFilter from "./CourseLevelsFilter";
import PriceFilter from "./PriceFilter";

const ExploreSideBar = () => {
  return (
    <aside className="hidden min-h-screen p-4 lg:block">
      <Card className="h-full w-full">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>

        <CardContent className="flex h-full w-full flex-col justify-start gap-8">
          <PriceFilter />
          <Separator className="my-4" />
          <AgeGroupFilter />
          <Separator className="my-4" />
          <CourseLevelsFilter />
          <Separator className="my-4" />
        </CardContent>
      </Card>
    </aside>
  );
};

export default ExploreSideBar;
