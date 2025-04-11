import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { onUpdateUserAction } from "@/actions/user";
import { User, UserRole } from "@prisma/client";
import { UserRoleSchema } from "@/schemas";

type Props = {
  user: User;
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useEditUserRole = ({ user, setIsEditable }: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<z.infer<typeof UserRoleSchema>>({
    resolver: zodResolver(UserRoleSchema),
    defaultValues: {
      role: user.role,
    },
  });

  const { mutate: updateUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: async ({ role }: { role: UserRole }) => {
      return await onUpdateUserAction(user.id, { role });
    },
    onSuccess: (data) => {
      if (data.status === 200) {
        toast.success("User role updated");
        setIsEditable(false);
        router.refresh();
      } else {
        toast.error(data.message || "Update failed");
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || "Update failed");
    },
  });

  const onSubmit = handleSubmit((data) => {
    updateUser({ role: data.role });
  });

  return {
    register,
    onSubmit,
    errors,
    isSubmitting,
    isUpdatingUser,
    watch,
    setValue,
  };
};
