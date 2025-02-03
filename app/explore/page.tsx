"use client";

import GoogleMapWithAddressInput from "@/components/GoogleMapWithAddressInput";

const ExplorePage = () => {
  return (
    <div className="mt-24 flex min-h-screen w-full flex-col items-center justify-center">
      <h1 className="h-full w-full text-2xl font-bold text-red-500">EXPLORE</h1>
      <GoogleMapWithAddressInput />
    </div>
  );
};

export default ExplorePage;
