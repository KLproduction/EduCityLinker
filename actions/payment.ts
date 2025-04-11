import { db } from "@/lib/db";

export const getAllEnrollmentPaymentAction = async () => {
  try {
    const payment = await db.enrollmentPayment.findMany();
    if (payment) {
      return {
        payment,
        status: 200,
      };
    }
    return {
      message: "No Payment Found",
      status: 404,
    };
  } catch (error) {
    console.log(error);
  }
};
