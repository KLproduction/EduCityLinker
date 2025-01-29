import { RegisterForm } from "@/components/auth/RegisterForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const session = await auth();
  if (session) {
    redirect("/setting");
  }
  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-800">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
