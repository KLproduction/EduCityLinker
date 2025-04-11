import MobileNavbar from "@/components/Nabar/MobileNavbar";
import Navbar from "@/components/Nabar/Navbar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full items-center justify-center bg-zinc-300">
      <Navbar />
      <MobileNavbar />
      {children}
    </div>
  );
};

export default AuthLayout;
