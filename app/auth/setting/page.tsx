import Settingform from "@/components/auth/SettingForm";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const SettingPage = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/auth/login");
  }
  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-800">
      <Settingform user={user!} />
    </div>
  );
};

export default SettingPage;
