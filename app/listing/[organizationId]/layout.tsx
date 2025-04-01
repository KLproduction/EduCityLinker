import { CreateEnrollmentModal } from "@/components/modals/CreateEnrollmentModal";
import Navbar from "@/components/Nabar/Navbar";

type Props = {
  children: React.ReactNode;
};

const ListingPageLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-20">
        <Navbar />
        <CreateEnrollmentModal />
      </div>
      {children}
    </div>
  );
};

export default ListingPageLayout;
