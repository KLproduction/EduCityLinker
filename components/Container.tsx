"use client";

type Props = {
  children: React.ReactNode;
};

const MyContainer = ({ children }: Props) => {
  return (
    <div className="mx-auto max-w-[2520px] px-4 sm:px-2 md:px-10 xl:px-24">
      {children}
    </div>
  );
};

export default MyContainer;
