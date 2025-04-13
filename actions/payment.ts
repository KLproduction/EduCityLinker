"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  CancellationState,
  EnrollmentConfirmationState,
  EnrollmentRequestState,
  PaymentState,
  UserRole,
} from "@prisma/client";

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

export const onRefundConfirmAction = async (cancellationId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 401,
        message: "No user found",
      };
    }
    if (user?.role !== UserRole.ADMIN) {
      return {
        status: 403,
        message: "Unauthorized",
      };
    }

    const cancellation = await db.enrollmentCancellation.findUnique({
      where: {
        id: cancellationId,
      },
    });

    if (!cancellation) {
      return {
        status: 404,
        message: "Cancellation not found",
      };
    }

    const payment = await db.enrollmentPayment.findUnique({
      where: {
        id: cancellation?.paymentId,
      },
    });

    if (!payment) {
      return {
        status: 404,
        message: "Payment not found",
      };
    }

    const confirmation = await db.enrollmentConfirmation.findUnique({
      where: {
        id: payment?.confirmationId,
      },
    });

    if (!confirmation) {
      return {
        status: 404,
        message: "Confirmation not found",
      };
    }

    const enrollmentRequest = await db.enrollmentRequest.findUnique({
      where: { id: confirmation?.requestId },
    });

    if (!enrollmentRequest) {
      return {
        status: 404,
        message: "Enrollment request not found",
      };
    }

    if (payment.remainingBalance > 0) {
      await db.enrollmentCancellation.update({
        where: {
          id: cancellation.id,
        },
        data: {
          refundProcessed: CancellationState.PROCESSED,
        },
      });

      await db.enrollmentConfirmation.update({
        where: {
          id: confirmation.id,
        },
        data: {
          status: EnrollmentConfirmationState.CANCELLED,
        },
      });

      await db.enrollmentPayment.update({
        where: {
          id: payment.id,
        },
        data: {
          status: PaymentState.CANCELLED,
        },
      });

      await db.enrollmentRequest.update({
        where: { id: enrollmentRequest.id },
        data: {
          status: EnrollmentRequestState.CANCELLED,
        },
      });
    }

    if (payment.remainingBalance === 0) {
      await db.enrollmentCancellation.update({
        where: {
          id: cancellation.id,
        },
        data: {
          refundProcessed: CancellationState.PROCESSING,
        },
      });

      await db.enrollmentConfirmation.update({
        where: {
          id: confirmation.id,
        },
        data: {
          status: EnrollmentConfirmationState.CANCELLATION_PROCESSING,
        },
      });

      await db.enrollmentPayment.update({
        where: {
          id: payment.id,
        },
        data: {
          status: PaymentState.CANCELLATION_PROCESSING,
        },
      });
    }

    return {
      status: 200,
      message: "Refund processed successfully",
    };

    //webhook for refund
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Something went wrong!",
    };
  }
};
