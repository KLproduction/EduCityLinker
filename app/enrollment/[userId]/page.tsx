import { getEnrollmentRequestsByUserIdAction } from "@/actions/create-enrollment";
import BackToExploreBtn from "@/components/global/BackToExploreBtn";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import UserEnrollmentDetails from "../_compoents/UserEnrollmentDetails";
import { getOrganizationByListingIdAction } from "@/actions/listing";

type Props = {
  params: { userId: string };
};

const UserEnrollmentPage = async ({ params }: Props) => {
  const user = await currentUser();

  if (!user) {
    redirect("/explore");
  }
  const enrollmentData = await getEnrollmentRequestsByUserIdAction(
    params.userId,
  );
  const enrollment = enrollmentData?.enrollmentRequests;
  if (enrollment?.length === 0 || !enrollment) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1>No Enrollment Found.</h1>
        <BackToExploreBtn />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-start">
        <BackToExploreBtn variant="outline" />
      </div>
      <h1 className="my-3 flex w-full justify-start text-3xl font-semibold">
        Enrollment Requests
      </h1>
      {enrollment.map((item, index) => (
        <UserEnrollmentDetails key={index} enrollmentData={item} />
      ))}
    </div>
  );
};

export default UserEnrollmentPage;
