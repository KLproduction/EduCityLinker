import Navbar from "@/components/Nabar/Navbar";

type Props = {
  children: React.ReactNode;
};

const ListingPageLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-48">
        <Navbar />
      </div>
      {children}
    </div>
  );
};

export default ListingPageLayout;
