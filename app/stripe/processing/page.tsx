import { Suspense } from "react";
import MySpinner from "@/components/ui/MySpinner";
import ProcessingLogic from "./_components/ProcessingLogic";

export default function ProcessingPage({
  searchParams,
}: {
  searchParams: { payment_intent: string };
}) {
  return <ProcessingLogic payment_intent={searchParams.payment_intent} />;
}
