import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AgeGroupFilter from "./AgeGroupFilter";

const ExploreSideBar = () => {
  return (
    <aside className="hidden min-h-screen p-4 lg:block">
      <Card className="h-full w-full">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>

        <CardContent className="flex h-full w-full flex-col justify-start gap-8">
          <AgeGroupFilter />
        </CardContent>
      </Card>
    </aside>
  );
};

export default ExploreSideBar;
