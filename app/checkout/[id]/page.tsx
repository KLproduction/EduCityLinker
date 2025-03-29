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

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const CheckOutPage = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  if (!user) revalidatePath("/auth/login");

  const { enrollmentRequests: enrollment } =
    await getEnrollmentRequestsByIdAction(params.id);
  const organization = await getOrganizationByListingIdAction(
    enrollment?.listingId!,
  );
  const listing = await getListingByIdAction(enrollment?.listingId!);

  if (!enrollment) {
    <MySpinner />;
    revalidatePath("/cart");
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(enrollment?.orderTotalPrice! * 100),
      currency: "GBP",
      metadata: {
        orderId: enrollment?.id!,
        userId: enrollment?.userId!,
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
        />
      </div>
    );
  }
};

export default CheckOutPage;
