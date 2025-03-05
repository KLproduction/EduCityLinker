"use client";

import { Timeline } from "@/components/ui/timeline";
import {
  Search,
  BarChart2,
  Send,
  Mail,
  CreditCard,
  GraduationCap,
} from "lucide-react";

export default function StepIntro() {
  const timelineData = [
    {
      title: "Step 1",
      content: (
        <div className="rounded-xl bg-white p-6 shadow-md dark:bg-neutral-900">
          <div className="mb-4 flex items-center text-rose-500">
            <Search className="mr-2 h-6 w-6" />
            <h1 className="text-xl font-semibold text-rose-500">
              Find Your Perfect School & Location
            </h1>
          </div>
          <p className="text-neutral-600 dark:text-neutral-300">
            Use our <span className="font-bold">smart search tool</span> to
            explore top-rated English learning centers in{" "}
            <span className="font-bold">your preferred location</span>.<br />{" "}
            Find the perfect match based on your goals, schedule, and budget.
          </p>
        </div>
      ),
    },
    {
      title: "Step 2",
      content: (
        <div className="rounded-xl bg-white p-6 shadow-md dark:bg-neutral-900">
          <div className="mb-4 flex items-center text-rose-500">
            <BarChart2 className="mr-2 h-6 w-6" />
            <h1 className="text-xl font-semibold text-rose-500">
              Compare & Choose What’s Best for You
            </h1>
          </div>
          <p className="text-neutral-600 dark:text-neutral-300">
            Easily{" "}
            <span className="font-bold">
              compare prices, locations, and course details
            </span>
            with our side-by-side comparison tool. Read reviews, check
            facilities, and make an informed decision that fits your learning
            style.
          </p>
        </div>
      ),
    },
    {
      title: "Step 3",
      content: (
        <div className="rounded-xl bg-white p-6 shadow-md dark:bg-neutral-900">
          <div className="mb-4 flex items-center text-rose-500">
            <Send className="mr-2 h-6 w-6" />
            <h1 className="text-xl font-semibold text-rose-500">
              Enroll & Check Availability
            </h1>
          </div>
          <p className="text-neutral-600 dark:text-neutral-300">
            Enroll in your chosen course with{" "}
            <span className="font-bold">no upfront payment</span>. We will
            confirm course availability with the center and provide you with the
            next steps. <br />
            Our team will contact you to ensure a smooth enrollment process.
          </p>
        </div>
      ),
    },
    {
      title: "Step 4",
      content: (
        <div className="rounded-xl bg-white p-6 shadow-md dark:bg-neutral-900">
          <div className="mb-4 flex items-center text-rose-500">
            <Mail className="mr-2 h-6 w-6" />
            <h1 className="text-xl font-semibold text-rose-500">
              Get Confirmation & Personalized Support
            </h1>
          </div>
          <p className="text-neutral-600 dark:text-neutral-300">
            Receive an <span className="font-bold">email confirmation</span>{" "}
            with all your course details. <br />
            Our <span className="font-bold">expert advisors</span> will connect
            with you to discuss flexible booking options and answer any
            questions.
          </p>
        </div>
      ),
    },
    {
      title: "Step 5",
      content: (
        <div className="rounded-xl bg-white p-6 shadow-md dark:bg-neutral-900">
          <div className="mb-4 flex items-center text-rose-500">
            <CreditCard className="mr-2 h-6 w-6" />
            <h1 className="text-xl font-semibold text-rose-500">
              {`Secure Your Spot – Pay & Confirm`}
            </h1>
          </div>
          <p className="text-neutral-600 dark:text-neutral-300">
            Complete your <span className="font-bold">deposit payment</span> by
            the due date to secure your spot. <br />
            Confirm your <span className="font-bold">
              course start date
            </span>{" "}
            and stay on track with a clear final payment deadline.
          </p>
        </div>
      ),
    },
    {
      title: "Step 6",
      content: (
        <div className="rounded-xl bg-white p-6 shadow-md dark:bg-neutral-900">
          <div className="mb-4 flex items-center text-rose-500">
            <GraduationCap className="mr-2 h-6 w-6" />
            <h1 className="text-xl font-semibold text-rose-500">
              Begin Your Learning Journey
            </h1>
          </div>
          <p className="text-neutral-600 dark:text-neutral-300">
            {`With all payments completed, you’re all set! `}
            <span className="font-bold">
              {" "}
              Arrive at your school on the start date
            </span>
            {`and embark on an enriching learning experience. 
            We’ll be here to support you throughout your course.`}
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-32 min-h-screen overflow-hidden bg-neutral-50 dark:bg-neutral-950">
      {/* Timeline */}
      <Timeline data={timelineData} />
    </div>
  );
}
