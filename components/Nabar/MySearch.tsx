"use client";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
type Props = {};

const MySearch = (props: Props) => {
  return (
    <div className="md:w-ato w-full rounded-full border py-2 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="px-6 text-sm font-semibold text-zinc-800">Anywhere</div>
        <div className="hidden flex-1 border-x-[1px] px-6 text-center text-sm font-semibold text-zinc-800 sm:block">
          Any Week
        </div>
        <div className="flex items-center gap-3 pl-6 pr-2 text-sm text-zinc-600">
          <Link href={"/explore"}>Explore</Link>
          <div className="rounded-full bg-rose-500 p-2 text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySearch;
