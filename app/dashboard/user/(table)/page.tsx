import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EnrollmentRequest, User } from "@prisma/client";
import { getAllEnrollmentRequestsAction } from "@/actions/create-enrollment";
import { getOrganizationIdByUserIdAction } from "@/actions/organization";
import { currentUser } from "@/lib/auth";
import DashboardSideBar from "../../_components/DashboardSideBar";
import { getAllUserAction } from "@/actions/user";

const EnrollmentTablePage = async () => {
  const user = await currentUser();
  const response = await getAllUserAction();
  const data: User[] | undefined = response?.users;
  const organizationId = await getOrganizationIdByUserIdAction(user?.id!);

  return (
    <div className="container relative flex min-h-full w-screen flex-col items-center justify-center">
      <div className="flex w-full justify-center gap-3">
        <DashboardSideBar organizationId={organizationId?.organization!} />
        <div className="w-full flex-1 md:min-w-[3/4]">
          <div className="container mx-auto pb-20 sm:py-10">
            <div className="flex justify-start p-0"></div>
            {data && <DataTable columns={columns} data={data} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentTablePage;
