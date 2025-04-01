import Stripe from "stripe";
import { currentUser } from "@/lib/auth";
import MySpinner from "@/components/ui/MySpinner";
import { revalidatePath } from "next/cache";
import { getEnrollmentRequestsByIdAction } from "@/actions/create-enrollment";
import {
  getListingByIdAction,
  getOrganizationByListingIdAction,
} from "@/actions/listing";
import { db } from "@/lib/db";
import FullPaymentCheckOutForm from "../_component/FullPaymentCheckOutForm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const FullPaymentCheckOutPage = async ({
  params,
}: {
  params: { id: string };
}) => {
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

  const enrollmentPayment = await db.enrollmentPayment.findFirst({
    where: {
      confirmationId: enrollmentConfirm?.id,
    },
  });

  if (!enrollment) {
    <MySpinner />;
    revalidatePath(`/enrollment/${user?.id}`);
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: enrollmentPayment?.remainingBalance! * 100,
      currency: "GBP",
      metadata: {
        orderId: enrollment?.id!,
        userId: enrollment?.userId!,
        orderType: "full",
      },
    });

    if (paymentIntent.client_secret === null) {
      throw Error("Stripe failed to create payment intent");
    }

    return (
      <div className="pb-12 sm:pt-20">
        <FullPaymentCheckOutForm
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

export default FullPaymentCheckOutPage;
