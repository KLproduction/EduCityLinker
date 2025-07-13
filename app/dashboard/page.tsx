import Navbar from "@/components/Nabar/Navbar";

import DashboardSideBar from "./_components/DashboardSideBar";
import { currentUser } from "@/lib/auth";
import {
  getAllOrganizationsAction,
  getOrganizationIdByUserIdAction,
} from "@/actions/organization";
import { redirect } from "next/navigation";
import { getAllUserAction } from "@/actions/user";
import { getListingsAction } from "@/actions/listing";
import { getAllEnrollmentRequestsAction } from "@/actions/create-enrollment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import EnrollmentChart from "./_components/EnrollmentChart";

type Props = {};

const DashboardPage = async (props: Props) => {
  const user = await currentUser();
  const organization = await getOrganizationIdByUserIdAction(user?.id!);

  if (!user || (user.role !== "ORGANIZER" && user.role !== "ADMIN")) {
    redirect("/");
  }

  const usersResponse = await getAllUserAction();
  const listingsResponse = await getListingsAction();
  const organizationsResponse = await getAllOrganizationsAction();
  const enrollmentsResponse = await getAllEnrollmentRequestsAction();

  const totalUsers = usersResponse?.users?.length || 0;
  const totalListings = listingsResponse?.listings?.length || 0;
  const totalOrganizations = organizationsResponse?.length || 0;
  const totalEnrollments = enrollmentsResponse?.enrollmentRequests?.length || 0;

  return (
    <div className="container mx-auto py-10">
      <div className="flex w-full justify-center gap-3">
        <DashboardSideBar organizationId={organization.organization!} />
        <div className="w-full flex-1 md:min-w-[3/4]">
          <h1 className="mb-6 text-2xl font-bold">Dashboard Overview</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex flex-col justify-start gap-1">
                  <span>Total</span>
                  <span>Users</span>{" "}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-4xl font-bold text-primary">
                  {totalUsers}
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex flex-col justify-start gap-1">
                  <span>Total</span>
                  <span>Listings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-4xl font-bold text-primary">
                  {totalListings}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex flex-col justify-start gap-1">
                  <span>Total</span>
                  <span>Organizations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-4xl font-bold text-primary">
                  {totalOrganizations}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex flex-col justify-start gap-1">
                  <span>Total</span>
                  <span>Enrollments</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-4xl font-bold text-primary">
                  {totalEnrollments}
                </p>
              </CardContent>
            </Card>
          </div>
          <Separator className="my-10" />
          <div className="hidden md:block">
            <EnrollmentChart
              enrollmentRequests={enrollmentsResponse?.enrollmentRequests!}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
