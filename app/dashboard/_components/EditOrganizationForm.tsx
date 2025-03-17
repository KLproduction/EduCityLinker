"use client";

import { useEditOrganization } from "@/hooks/create-organization";
import { useEffect } from "react";

const EditOrganizationForm = ({
  organizationId,
}: {
  organizationId: string;
}) => {
  const { register, submit, setValue, watch, reset, getValues, isPending } =
    useEditOrganization(organizationId);

  // Reset form when organization data changes
  useEffect(() => {
    reset();
  }, [reset]);

  console.log(getValues);

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-4 text-2xl font-semibold">Edit Organization</h1>

      <form onSubmit={submit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {getValues("name")}
          </label>
          <input
            type="text"
            {...register("name")}
            className="mt-1 block w-full rounded-md border p-2"
            placeholder={getValues("name")}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description")}
            className="mt-1 block w-full rounded-md border p-2"
            rows={3}
          ></textarea>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            {...register("location")}
            className="mt-1 block w-full rounded-md border p-2"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <input
            type="number"
            step="0.1"
            min="0.5"
            {...register("rating")}
            className="mt-1 block w-full rounded-md border p-2"
          />
        </div>

        {/* Airport Transfers */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={watch("airportTransfers")}
            onChange={(e) => setValue("airportTransfers", e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">
            Airport Transfers
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-blue-600 px-4 py-2 text-white"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditOrganizationForm;
