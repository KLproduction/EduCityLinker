import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EnrollmentCancellation } from "@prisma/client";
import { getAllEnrollmentCancellationsAction } from "@/actions/create-enrollment";
import { getOrganizationIdByUserIdAction } from "@/actions/organization";
import { currentUser } from "@/lib/auth";
import DashboardSideBar from "../../_components/DashboardSideBar";

const EnrollmentTablePage = async () => {
  const user = await currentUser();
  const response = await getAllEnrollmentCancellationsAction();
  const data: EnrollmentCancellation[] | undefined =
    response?.enrollmentCancellations;
  const organizationId = await getOrganizationIdByUserIdAction(user?.id!);

  return (
    <div className="container relative flex min-h-full w-screen flex-col items-center justify-center">
      <div className="flex w-full justify-center gap-3">
        <DashboardSideBar organizationId={organizationId?.organization!} />
        <div className="w-full flex-1 md:min-w-[3/4]">
          <div className="container mx-auto pb-20 sm:py-10">
            <div className="flex justify-start p-0"></div>
            {!data || data.length === 0 ? (
              <div className="text-center text-gray-500">
                No cancellations found.
              </div>
            ) : (
              <DataTable columns={columns} data={data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentTablePage;
