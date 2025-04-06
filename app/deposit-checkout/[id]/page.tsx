import Stripe from "stripe";
import { currentUser } from "@/lib/auth";
import CheckOutForm from "../_component/CheckOutForm";
import MySpinner from "@/components/ui/MySpinner";
import { revalidatePath } from "next/cache";
import { getEnrollmentRequestsByIdAction } from "@/actions/create-enrollment";
import { getOrganizationByIdAction } from "@/actions/create-organization";
import {
  getListingByIdAction,
  getOrganizationByListingIdAction,
} from "@/actions/listing";
import { db } from "@/lib/db";
import { DEPOSIT_RATE } from "@/data/data";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const DepositCheckOutPage = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  if (!user) revalidatePath("/auth/login");

  const { enrollmentRequests: enrollment } =
    await getEnrollmentRequestsByIdAction(params.id);
  const organization = await getOrganizationByListingIdAction(
    enrollment?.listingId!,
  );
  const listing = await getListingByIdAction(enrollment?.listingId!);
  const enrollmentConfirm = await db.enrollmentConfirmation.findFirst({
    where: {
      requestId: enrollment?.id!,
    },
  });

  if (!enrollment) {
    <MySpinner />;
    revalidatePath(`/enrollment/${user?.id}`);
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(
        Math.round(enrollment?.orderTotalPrice! * DEPOSIT_RATE) * 100,
      ),
      currency: "GBP",
      metadata: {
        orderId: enrollment?.id!,
        userId: enrollment?.userId!,
        orderType: "deposit",
      },
    });

    if (paymentIntent.client_secret === null) {
      throw Error("Stripe failed to create payment intent");
    }

    return (
      <div className="pb-12 sm:pt-20">
        <CheckOutForm
          enrollment={enrollment!}
          organization={organization?.organization!}
          listing={listing?.listing!}
          clientSecret={paymentIntent.client_secret}
          enrollmentConfirmation={enrollmentConfirm!}
        />
      </div>
    );
  }
};

export default DepositCheckOutPage;
